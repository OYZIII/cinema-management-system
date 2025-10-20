package com.cinema;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.cinema.mapper")
public class CinemaApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinemaApplication.class, args);
        System.out.println("========================================");
        System.out.println("影院管理系统启动成功！");
        System.out.println("接口文档地址: http://localhost:8080/api");
        System.out.println("========================================");
    }
}

