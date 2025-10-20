package com.cinema.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cinema.entity.Schedule;
import java.util.List;
import java.util.Map;

/**
 * 排片服务接口
 */
public interface ScheduleService extends IService<Schedule> {

    /**
     * 根据电影ID查询排片
     */
    List<Map<String, Object>> getSchedulesByMovieId(Long movieId);

    /**
     * 获取排片详情（含座位信息）
     */
    Map<String, Object> getScheduleDetail(Long scheduleId);
}

