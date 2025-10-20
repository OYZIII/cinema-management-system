package com.cinema.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.cinema.common.Result;
import com.cinema.entity.Movie;
import com.cinema.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

/**
 * 电影控制器
 */
@RestController
@RequestMapping("/movie")
@CrossOrigin
public class MovieController {

    @Autowired
    private MovieService movieService;

    /**
     * 分页查询电影列表
     */
    @GetMapping("/list")
    public Result<IPage<Movie>> getMovieList(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer status) {
        IPage<Movie> page = movieService.getMovieList(current, size, keyword, status);
        return Result.success(page);
    }

    /**
     * 获取热映电影
     */
    @GetMapping("/hot")
    public Result<IPage<Movie>> getHotMovies(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer size) {
        IPage<Movie> page = movieService.getHotMovies(current, size);
        return Result.success(page);
    }

    /**
     * 获取即将上映的电影
     */
    @GetMapping("/coming")
    public Result<IPage<Movie>> getComingSoonMovies(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer size) {
        IPage<Movie> page = movieService.getComingSoonMovies(current, size);
        return Result.success(page);
    }

    /**
     * 获取电影详情
     */
    @GetMapping("/{id}")
    public Result<Movie> getMovieById(@PathVariable Long id) {
        Movie movie = movieService.getById(id);
        return Result.success(movie);
    }

    /**
     * 添加电影（管理员）
     */
    @PostMapping("/add")
    public Result<Void> addMovie(@RequestBody Movie movie) {
        movie.setCreateTime(LocalDateTime.now());
        movie.setUpdateTime(LocalDateTime.now());
        movieService.save(movie);
        return Result.success("添加成功", null);
    }

    /**
     * 更新电影（管理员）
     */
    @PutMapping("/update")
    public Result<Void> updateMovie(@RequestBody Movie movie) {
        movie.setUpdateTime(LocalDateTime.now());
        movieService.updateById(movie);
        return Result.success("更新成功", null);
    }

    /**
     * 删除电影（管理员）
     */
    @DeleteMapping("/{id}")
    public Result<Void> deleteMovie(@PathVariable Long id) {
        movieService.removeById(id);
        return Result.success("删除成功", null);
    }
}

