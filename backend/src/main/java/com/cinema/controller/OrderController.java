package com.cinema.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.cinema.common.Result;
import com.cinema.dto.OrderDTO;
import com.cinema.entity.Order;
import com.cinema.service.OrderService;
import com.cinema.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * 订单控制器
 */
@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * 创建订单
     */
    @PostMapping("/create")
    public Result<Order> createOrder(@RequestHeader("Authorization") String token,
                                      @Validated @RequestBody OrderDTO orderDTO) {
        Long userId = JwtUtils.getUserIdFromToken(token);
        Order order = orderService.createOrder(userId, orderDTO);
        return Result.success("订单创建成功", order);
    }

    /**
     * 取消订单
     */
    @PostMapping("/cancel/{orderId}")
    public Result<Void> cancelOrder(@RequestHeader("Authorization") String token,
                                     @PathVariable Long orderId) {
        Long userId = JwtUtils.getUserIdFromToken(token);
        orderService.cancelOrder(orderId, userId);
        return Result.success("订单已取消", null);
    }

    /**
     * 支付订单
     */
    @PostMapping("/pay/{orderId}")
    public Result<Void> payOrder(@RequestHeader("Authorization") String token,
                                  @PathVariable Long orderId) {
        Long userId = JwtUtils.getUserIdFromToken(token);
        orderService.payOrder(orderId, userId);
        return Result.success("支付成功", null);
    }

    /**
     * 获取用户订单列表
     */
    @GetMapping("/list")
    public Result<IPage<Order>> getUserOrders(
            @RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer size) {
        Long userId = JwtUtils.getUserIdFromToken(token);
        IPage<Order> page = orderService.getUserOrders(userId, current, size);
        return Result.success(page);
    }

    /**
     * 获取订单详情
     */
    @GetMapping("/{id}")
    public Result<Order> getOrderById(@RequestHeader("Authorization") String token,
                                       @PathVariable Long id) {
        Long userId = JwtUtils.getUserIdFromToken(token);
        Order order = orderService.getById(id);
        if (order != null && !order.getUserId().equals(userId)) {
            return Result.error("无权查看此订单");
        }
        return Result.success(order);
    }
}

