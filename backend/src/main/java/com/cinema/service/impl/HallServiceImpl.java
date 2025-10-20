package com.cinema.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cinema.entity.Hall;
import com.cinema.mapper.HallMapper;
import com.cinema.service.HallService;
import org.springframework.stereotype.Service;

/**
 * 影厅服务实现类
 */
@Service
public class HallServiceImpl extends ServiceImpl<HallMapper, Hall> implements HallService {
}

