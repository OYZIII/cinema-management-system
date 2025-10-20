package com.cinema.controller;

import com.cinema.common.Result;
import com.cinema.entity.Schedule;
import com.cinema.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * 排片控制器
 */
@RestController
@RequestMapping("/schedule")
@CrossOrigin
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    /**
     * 根据电影ID获取排片
     */
    @GetMapping("/movie/{movieId}")
    public Result<List<Map<String, Object>>> getSchedulesByMovieId(@PathVariable Long movieId) {
        List<Map<String, Object>> schedules = scheduleService.getSchedulesByMovieId(movieId);
        return Result.success(schedules);
    }

    /**
     * 获取排片详情（含座位信息）
     */
    @GetMapping("/{id}")
    public Result<Map<String, Object>> getScheduleDetail(@PathVariable Long id) {
        Map<String, Object> detail = scheduleService.getScheduleDetail(id);
        return Result.success(detail);
    }

    /**
     * 添加排片（管理员）
     */
    @PostMapping("/add")
    public Result<Void> addSchedule(@RequestBody Schedule schedule) {
        schedule.setSoldCount(0);
        schedule.setCreateTime(LocalDateTime.now());
        schedule.setUpdateTime(LocalDateTime.now());
        scheduleService.save(schedule);
        return Result.success("添加成功", null);
    }

    /**
     * 更新排片（管理员）
     */
    @PutMapping("/update")
    public Result<Void> updateSchedule(@RequestBody Schedule schedule) {
        schedule.setUpdateTime(LocalDateTime.now());
        scheduleService.updateById(schedule);
        return Result.success("更新成功", null);
    }

    /**
     * 删除排片（管理员）
     */
    @DeleteMapping("/{id}")
    public Result<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.removeById(id);
        return Result.success("删除成功", null);
    }
}

