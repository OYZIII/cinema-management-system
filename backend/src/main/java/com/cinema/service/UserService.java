package com.cinema.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cinema.dto.LoginDTO;
import com.cinema.dto.RegisterDTO;
import com.cinema.entity.User;

import java.util.Map;

/**
 * 用户服务接口
 */
public interface UserService extends IService<User> {

    /**
     * 用户注册
     */
    void register(RegisterDTO registerDTO);

    /**
     * 用户登录
     */
    Map<String, Object> login(LoginDTO loginDTO);

    /**
     * 获取当前用户信息
     */
    User getCurrentUser(Long userId);
}

