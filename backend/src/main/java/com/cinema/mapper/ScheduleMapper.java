package com.cinema.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cinema.entity.Schedule;
import org.apache.ibatis.annotations.Mapper;

/**
 * 排片Mapper
 */
@Mapper
public interface ScheduleMapper extends BaseMapper<Schedule> {
}

