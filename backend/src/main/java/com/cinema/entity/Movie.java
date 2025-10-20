package com.cinema.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 电影实体类
 */
@Data
@TableName("movie")
public class Movie implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 电影名称
     */
    private String name;

    /**
     * 英文名称
     */
    private String nameEn;

    /**
     * 导演
     */
    private String director;

    /**
     * 主演
     */
    private String actors;

    /**
     * 类型（动作、喜剧、科幻等）
     */
    private String type;

    /**
     * 地区
     */
    private String area;

    /**
     * 语言
     */
    private String language;

    /**
     * 时长（分钟）
     */
    private Integer duration;

    /**
     * 上映日期
     */
    private LocalDate releaseDate;

    /**
     * 评分
     */
    private BigDecimal rating;

    /**
     * 海报图片
     */
    private String poster;

    /**
     * 剧情简介
     */
    private String description;

    /**
     * 状态 0-即将上映 1-正在热映 2-已下架
     */
    private Integer status;

    /**
     * 逻辑删除
     */
    private Integer deleted;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;
}

