package com.cinema.controller;

import com.cinema.common.Result;
import com.cinema.dto.LoginDTO;
import com.cinema.dto.RegisterDTO;
import com.cinema.entity.User;
import com.cinema.service.UserService;
import com.cinema.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 用户控制器
 */
@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public Result<Void> register(@Validated @RequestBody RegisterDTO registerDTO) {
        userService.register(registerDTO);
        return Result.success("注册成功", null);
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@Validated @RequestBody LoginDTO loginDTO) {
        Map<String, Object> result = userService.login(loginDTO);
        return Result.success("登录成功", result);
    }

    /**
     * 获取当前用户信息
     */
    @GetMapping("/info")
    public Result<User> getCurrentUser(@RequestHeader("Authorization") String token) {
        Long userId = JwtUtils.getUserIdFromToken(token);
        User user = userService.getCurrentUser(userId);
        return Result.success(user);
    }

    /**
     * 更新用户信息
     */
    @PutMapping("/update")
    public Result<Void> updateUser(@RequestHeader("Authorization") String token,
                                    @RequestBody User user) {
        Long userId = JwtUtils.getUserIdFromToken(token);
        user.setId(userId);
        user.setPassword(null); // 不允许通过此接口修改密码
        userService.updateById(user);
        return Result.success("更新成功", null);
    }
}

