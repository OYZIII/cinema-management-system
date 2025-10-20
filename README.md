# 影院管理系统

<p align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-2.7.0-brightgreen" alt="Spring Boot">
  <img src="https://img.shields.io/badge/React-18.2.0-blue" alt="React">
  <img src="https://img.shields.io/badge/MySQL-8.0-orange" alt="MySQL">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

## 项目简介

这是一个基于Spring Boot + React的影院管理系统，实现了电影院的日常运营管理功能，包括影片管理、影厅管理、排片管理、在线选座购票、订单管理等核心业务模块。

## 技术栈

### 后端
- Spring Boot 2.7.0
- MyBatis-Plus 3.5.2
- MySQL 8.0
- Redis 6.2
- JWT (JSON Web Token)
- Maven

### 前端
- React 18.2.0
- TypeScript 4.9.5
- Ant Design 5.0
- Axios
- React Router
- Echarts (数据可视化)

## 功能模块

### 1. 用户模块
- 用户注册、登录
- 用户信息管理
- 权限控制（管理员/普通用户）

### 2. 电影管理
- 电影信息的增删改查
- 电影海报上传
- 电影分类管理
- 正在热映/即将上映

### 3. 影厅管理
- 影厅信息管理
- 座位布局配置
- 影厅类型设置（2D/3D/IMAX）

### 4. 排片管理
- 场次安排
- 时间冲突检测
- 票价设置

### 5. 购票系统
- 在线选座
- 实时座位状态更新
- 订单生成

### 6. 订单管理
- 订单查询
- 订单状态管理
- 退票处理

### 7. 数据统计
- 票房统计
- 上座率分析
- 热门影片排行

## 项目结构

```
cinema-management-system/
├── backend/                    # 后端项目
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/cinema/
│   │       │       ├── controller/     # 控制器层
│   │       │       ├── service/        # 服务层
│   │       │       ├── mapper/         # 数据访问层
│   │       │       ├── entity/         # 实体类
│   │       │       ├── dto/            # 数据传输对象
│   │       │       ├── config/         # 配置类
│   │       │       └── utils/          # 工具类
│   │       └── resources/
│   │           ├── mapper/             # MyBatis映射文件
│   │           └── application.yml     # 配置文件
│   └── pom.xml
├── frontend/                   # 前端项目
│   ├── src/
│   │   ├── components/         # 组件
│   │   ├── pages/              # 页面
│   │   ├── services/           # API服务
│   │   ├── utils/              # 工具函数
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
└── sql/                        # 数据库脚本
    └── cinema.sql
```

## 核心功能展示

- 响应式设计，支持PC端和移动端访问
- 实时座位选择，使用WebSocket保证数据同步
- Redis缓存热门数据，提升系统性能
- 使用事务保证订单数据一致性
- JWT token实现无状态认证

## 开发说明

- 后端接口统一返回格式
- 前端使用Axios拦截器处理请求和响应
- 代码遵循阿里巴巴Java开发规范
- 使用ESLint和Prettier保证代码质量

## 作者

**OYZIII**

## 许可证

MIT License

