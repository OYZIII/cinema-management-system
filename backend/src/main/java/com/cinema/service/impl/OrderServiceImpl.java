package com.cinema.service.impl;

import cn.hutool.core.util.IdUtil;
import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cinema.dto.OrderDTO;
import com.cinema.entity.Order;
import com.cinema.entity.Schedule;
import com.cinema.mapper.OrderMapper;
import com.cinema.service.OrderService;
import com.cinema.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 订单服务实现类
 */
@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements OrderService {

    @Autowired
    private ScheduleService scheduleService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Order createOrder(Long userId, OrderDTO orderDTO) {
        // 获取排片信息
        Schedule schedule = scheduleService.getById(orderDTO.getScheduleId());
        if (schedule == null) {
            throw new RuntimeException("排片不存在");
        }

        // TODO: 检查座位是否已被占用（这里简化处理）

        // 计算总金额
        BigDecimal totalAmount = schedule.getPrice()
                .multiply(new BigDecimal(orderDTO.getSeats().size()));

        // 创建订单
        Order order = new Order();
        order.setOrderNo(IdUtil.getSnowflakeNextIdStr());
        order.setUserId(userId);
        order.setScheduleId(orderDTO.getScheduleId());
        order.setSeats(JSON.toJSONString(orderDTO.getSeats()));
        order.setTicketCount(orderDTO.getSeats().size());
        order.setTotalAmount(totalAmount);
        order.setStatus(0); // 待支付
        order.setCreateTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());

        this.save(order);

        // 更新已售座位数
        schedule.setSoldCount(schedule.getSoldCount() + orderDTO.getSeats().size());
        scheduleService.updateById(schedule);

        return order;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void cancelOrder(Long orderId, Long userId) {
        Order order = this.getById(orderId);
        if (order == null) {
            throw new RuntimeException("订单不存在");
        }

        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("无权操作此订单");
        }

        if (order.getStatus() != 0) {
            throw new RuntimeException("只能取消待支付订单");
        }

        // 更新订单状态
        order.setStatus(2); // 已取消
        order.setUpdateTime(LocalDateTime.now());
        this.updateById(order);

        // 恢复座位数
        Schedule schedule = scheduleService.getById(order.getScheduleId());
        schedule.setSoldCount(schedule.getSoldCount() - order.getTicketCount());
        scheduleService.updateById(schedule);
    }

    @Override
    public IPage<Order> getUserOrders(Long userId, Integer current, Integer size) {
        Page<Order> page = new Page<>(current, size);
        LambdaQueryWrapper<Order> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Order::getUserId, userId)
                .orderByDesc(Order::getCreateTime);
        
        return this.page(page, wrapper);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void payOrder(Long orderId, Long userId) {
        Order order = this.getById(orderId);
        if (order == null) {
            throw new RuntimeException("订单不存在");
        }

        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("无权操作此订单");
        }

        if (order.getStatus() != 0) {
            throw new RuntimeException("订单状态异常");
        }

        // 更新订单状态
        order.setStatus(1); // 已支付
        order.setPayTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        this.updateById(order);
    }
}

