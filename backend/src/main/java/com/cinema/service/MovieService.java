package com.cinema.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cinema.entity.Movie;

/**
 * 电影服务接口
 */
public interface MovieService extends IService<Movie> {

    /**
     * 分页查询电影列表
     */
    IPage<Movie> getMovieList(Integer current, Integer size, String keyword, Integer status);

    /**
     * 获取热映电影
     */
    IPage<Movie> getHotMovies(Integer current, Integer size);

    /**
     * 获取即将上映的电影
     */
    IPage<Movie> getComingSoonMovies(Integer current, Integer size);
}

