package com.cinema.dto;

import lombok.Data;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 订单创建DTO
 */
@Data
public class OrderDTO {

    @NotNull(message = "排片ID不能为空")
    private Long scheduleId;

    @NotNull(message = "座位信息不能为空")
    private List<SeatDTO> seats;

    @Data
    public static class SeatDTO {
        private Integer row;
        private Integer col;
    }
}

