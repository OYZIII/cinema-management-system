package com.cinema.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cinema.entity.Movie;
import com.cinema.mapper.MovieMapper;
import com.cinema.service.MovieService;
import org.springframework.stereotype.Service;

/**
 * 电影服务实现类
 */
@Service
public class MovieServiceImpl extends ServiceImpl<MovieMapper, Movie> implements MovieService {

    @Override
    public IPage<Movie> getMovieList(Integer current, Integer size, String keyword, Integer status) {
        Page<Movie> page = new Page<>(current, size);
        LambdaQueryWrapper<Movie> wrapper = new LambdaQueryWrapper<>();
        
        // 关键字搜索
        if (StrUtil.isNotBlank(keyword)) {
            wrapper.like(Movie::getName, keyword)
                    .or()
                    .like(Movie::getNameEn, keyword)
                    .or()
                    .like(Movie::getDirector, keyword)
                    .or()
                    .like(Movie::getActors, keyword);
        }
        
        // 状态筛选
        if (status != null) {
            wrapper.eq(Movie::getStatus, status);
        }
        
        wrapper.orderByDesc(Movie::getCreateTime);
        
        return this.page(page, wrapper);
    }

    @Override
    public IPage<Movie> getHotMovies(Integer current, Integer size) {
        Page<Movie> page = new Page<>(current, size);
        LambdaQueryWrapper<Movie> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Movie::getStatus, 1) // 正在热映
                .orderByDesc(Movie::getRating)
                .orderByDesc(Movie::getReleaseDate);
        
        return this.page(page, wrapper);
    }

    @Override
    public IPage<Movie> getComingSoonMovies(Integer current, Integer size) {
        Page<Movie> page = new Page<>(current, size);
        LambdaQueryWrapper<Movie> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Movie::getStatus, 0) // 即将上映
                .orderByAsc(Movie::getReleaseDate);
        
        return this.page(page, wrapper);
    }
}

