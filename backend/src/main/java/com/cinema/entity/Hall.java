package com.cinema.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 影厅实体类
 */
@Data
@TableName("hall")
public class Hall implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 影厅名称
     */
    private String name;

    /**
     * 影厅类型 0-2D 1-3D 2-IMAX
     */
    private Integer type;

    /**
     * 总行数
     */
    private Integer rowCount;

    /**
     * 总列数
     */
    private Integer colCount;

    /**
     * 总座位数
     */
    private Integer seatCount;

    /**
     * 座位布局（JSON格式）
     */
    private String seatLayout;

    /**
     * 状态 0-正常 1-维护中
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

