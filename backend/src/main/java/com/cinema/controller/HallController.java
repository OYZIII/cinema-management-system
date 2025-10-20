package com.cinema.controller;

import com.cinema.common.Result;
import com.cinema.entity.Hall;
import com.cinema.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 影厅控制器
 */
@RestController
@RequestMapping("/hall")
@CrossOrigin
public class HallController {

    @Autowired
    private HallService hallService;

    /**
     * 获取所有影厅
     */
    @GetMapping("/list")
    public Result<List<Hall>> getAllHalls() {
        List<Hall> halls = hallService.list();
        return Result.success(halls);
    }

    /**
     * 获取影厅详情
     */
    @GetMapping("/{id}")
    public Result<Hall> getHallById(@PathVariable Long id) {
        Hall hall = hallService.getById(id);
        return Result.success(hall);
    }

    /**
     * 添加影厅（管理员）
     */
    @PostMapping("/add")
    public Result<Void> addHall(@RequestBody Hall hall) {
        hall.setCreateTime(LocalDateTime.now());
        hall.setUpdateTime(LocalDateTime.now());
        hallService.save(hall);
        return Result.success("添加成功", null);
    }

    /**
     * 更新影厅（管理员）
     */
    @PutMapping("/update")
    public Result<Void> updateHall(@RequestBody Hall hall) {
        hall.setUpdateTime(LocalDateTime.now());
        hallService.updateById(hall);
        return Result.success("更新成功", null);
    }

    /**
     * 删除影厅（管理员）
     */
    @DeleteMapping("/{id}")
    public Result<Void> deleteHall(@PathVariable Long id) {
        hallService.removeById(id);
        return Result.success("删除成功", null);
    }
}

