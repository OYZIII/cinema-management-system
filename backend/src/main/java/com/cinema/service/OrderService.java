package com.cinema.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cinema.dto.OrderDTO;
import com.cinema.entity.Order;

/**
 * 订单服务接口
 */
public interface OrderService extends IService<Order> {

    /**
     * 创建订单
     */
    Order createOrder(Long userId, OrderDTO orderDTO);

    /**
     * 取消订单
     */
    void cancelOrder(Long orderId, Long userId);

    /**
     * 获取用户订单列表
     */
    IPage<Order> getUserOrders(Long userId, Integer current, Integer size);

    /**
     * 支付订单
     */
    void payOrder(Long orderId, Long userId);
}

