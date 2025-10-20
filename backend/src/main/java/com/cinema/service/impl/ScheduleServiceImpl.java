package com.cinema.service.impl;

import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cinema.entity.Hall;
import com.cinema.entity.Movie;
import com.cinema.entity.Order;
import com.cinema.entity.Schedule;
import com.cinema.mapper.ScheduleMapper;
import com.cinema.service.OrderService;
import com.cinema.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 排片服务实现类
 */
@Service
public class ScheduleServiceImpl extends ServiceImpl<ScheduleMapper, Schedule> implements ScheduleService {

    @Autowired
    private com.cinema.service.MovieService movieService;

    @Autowired
    private com.cinema.service.HallService hallService;

    @Autowired
    private OrderService orderService;

    @Override
    public List<Map<String, Object>> getSchedulesByMovieId(Long movieId) {
        LambdaQueryWrapper<Schedule> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Schedule::getMovieId, movieId)
                .ge(Schedule::getStartTime, LocalDateTime.now())
                .orderByAsc(Schedule::getStartTime);
        
        List<Schedule> schedules = this.list(wrapper);
        
        // 按日期分组
        Map<LocalDate, List<Schedule>> groupedSchedules = schedules.stream()
                .collect(Collectors.groupingBy(s -> s.getStartTime().toLocalDate()));
        
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<LocalDate, List<Schedule>> entry : groupedSchedules.entrySet()) {
            Map<String, Object> daySchedule = new HashMap<>();
            daySchedule.put("date", entry.getKey());
            
            List<Map<String, Object>> scheduleList = new ArrayList<>();
            for (Schedule schedule : entry.getValue()) {
                Hall hall = hallService.getById(schedule.getHallId());
                Map<String, Object> scheduleInfo = new HashMap<>();
                scheduleInfo.put("id", schedule.getId());
                scheduleInfo.put("startTime", schedule.getStartTime());
                scheduleInfo.put("endTime", schedule.getEndTime());
                scheduleInfo.put("price", schedule.getPrice());
                scheduleInfo.put("hallName", hall.getName());
                scheduleInfo.put("hallType", hall.getType());
                scheduleInfo.put("soldCount", schedule.getSoldCount());
                scheduleInfo.put("totalCount", hall.getSeatCount());
                scheduleList.add(scheduleInfo);
            }
            daySchedule.put("schedules", scheduleList);
            result.add(daySchedule);
        }
        
        return result;
    }

    @Override
    public Map<String, Object> getScheduleDetail(Long scheduleId) {
        Schedule schedule = this.getById(scheduleId);
        if (schedule == null) {
            throw new RuntimeException("排片不存在");
        }
        
        Movie movie = movieService.getById(schedule.getMovieId());
        Hall hall = hallService.getById(schedule.getHallId());
        
        // 获取已售座位
        LambdaQueryWrapper<Order> orderWrapper = new LambdaQueryWrapper<>();
        orderWrapper.eq(Order::getScheduleId, scheduleId)
                .in(Order::getStatus, Arrays.asList(0, 1)); // 待支付和已支付
        List<Order> orders = orderService.list(orderWrapper);
        
        Set<String> soldSeats = new HashSet<>();
        for (Order order : orders) {
            List<Map<String, Integer>> seats = JSON.parseArray(order.getSeats(), 
                    new com.alibaba.fastjson2.TypeReference<Map<String, Integer>>(){});
            for (Map<String, Integer> seat : seats) {
                soldSeats.add(seat.get("row") + "-" + seat.get("col"));
            }
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("schedule", schedule);
        result.put("movie", movie);
        result.put("hall", hall);
        result.put("soldSeats", soldSeats);
        
        return result;
    }
}

