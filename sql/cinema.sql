-- 创建数据库
CREATE DATABASE IF NOT EXISTS cinema_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE cinema_db;

-- 用户表
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `real_name` varchar(50) DEFAULT NULL COMMENT '真实姓名',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `role` int DEFAULT 0 COMMENT '角色 0-普通用户 1-管理员',
  `status` int DEFAULT 0 COMMENT '状态 0-正常 1-禁用',
  `deleted` int DEFAULT 0 COMMENT '逻辑删除 0-未删除 1-已删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 电影表
CREATE TABLE `movie` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '电影ID',
  `name` varchar(100) NOT NULL COMMENT '电影名称',
  `name_en` varchar(100) DEFAULT NULL COMMENT '英文名称',
  `director` varchar(100) DEFAULT NULL COMMENT '导演',
  `actors` varchar(500) DEFAULT NULL COMMENT '主演',
  `type` varchar(50) DEFAULT NULL COMMENT '类型',
  `area` varchar(50) DEFAULT NULL COMMENT '地区',
  `language` varchar(50) DEFAULT NULL COMMENT '语言',
  `duration` int DEFAULT NULL COMMENT '时长（分钟）',
  `release_date` date DEFAULT NULL COMMENT '上映日期',
  `rating` decimal(3,1) DEFAULT NULL COMMENT '评分',
  `poster` varchar(255) DEFAULT NULL COMMENT '海报',
  `description` text COMMENT '剧情简介',
  `status` int DEFAULT 0 COMMENT '状态 0-即将上映 1-正在热映 2-已下架',
  `deleted` int DEFAULT 0 COMMENT '逻辑删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='电影表';

-- 影厅表
CREATE TABLE `hall` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '影厅ID',
  `name` varchar(50) NOT NULL COMMENT '影厅名称',
  `type` int DEFAULT 0 COMMENT '影厅类型 0-2D 1-3D 2-IMAX',
  `row_count` int NOT NULL COMMENT '总行数',
  `col_count` int NOT NULL COMMENT '总列数',
  `seat_count` int NOT NULL COMMENT '总座位数',
  `seat_layout` text COMMENT '座位布局（JSON格式）',
  `status` int DEFAULT 0 COMMENT '状态 0-正常 1-维护中',
  `deleted` int DEFAULT 0 COMMENT '逻辑删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='影厅表';

-- 排片表
CREATE TABLE `schedule` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '排片ID',
  `movie_id` bigint NOT NULL COMMENT '电影ID',
  `hall_id` bigint NOT NULL COMMENT '影厅ID',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `price` decimal(10,2) NOT NULL COMMENT '票价',
  `sold_count` int DEFAULT 0 COMMENT '已售座位数',
  `status` int DEFAULT 0 COMMENT '状态 0-未开始 1-售票中 2-已结束',
  `deleted` int DEFAULT 0 COMMENT '逻辑删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_movie_id` (`movie_id`),
  KEY `idx_hall_id` (`hall_id`),
  KEY `idx_start_time` (`start_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='排片表';

-- 订单表
CREATE TABLE `order_info` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `order_no` varchar(50) NOT NULL COMMENT '订单号',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `schedule_id` bigint NOT NULL COMMENT '排片ID',
  `seats` text NOT NULL COMMENT '座位信息（JSON格式）',
  `ticket_count` int NOT NULL COMMENT '票数',
  `total_amount` decimal(10,2) NOT NULL COMMENT '总金额',
  `status` int DEFAULT 0 COMMENT '订单状态 0-待支付 1-已支付 2-已取消 3-已退款',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `deleted` int DEFAULT 0 COMMENT '逻辑删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_order_no` (`order_no`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_schedule_id` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';

-- 插入测试数据

-- 用户数据（密码都是 123456 的MD5值）
INSERT INTO `user` (`username`, `password`, `real_name`, `phone`, `email`, `role`, `status`) VALUES
('admin', 'e10adc3949ba59abbe56e057f20f883e', '管理员', '13800138000', 'admin@cinema.com', 1, 0),
('user', 'e10adc3949ba59abbe56e057f20f883e', '张三', '13800138001', 'user@cinema.com', 0, 0);

-- 电影数据
INSERT INTO `movie` (`name`, `name_en`, `director`, `actors`, `type`, `area`, `language`, `duration`, `release_date`, `rating`, `poster`, `description`, `status`) VALUES
('流浪地球2', 'The Wandering Earth II', '郭帆', '吴京, 刘德华, 李雪健', '科幻, 灾难', '中国大陆', '汉语普通话', 173, '2023-01-22', 8.3, '/posters/wandering-earth-2.jpg', '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新家园。然而宇宙之路危机四伏，为了拯救地球，流浪地球时代的年轻人再次挺身而出，展开争分夺秒的生死之战。', 1),
('满江红', 'Full River Red', '张艺谋', '沈腾, 易烊千玺, 张译', '剧情, 悬疑', '中国大陆', '汉语普通话', 159, '2023-01-22', 7.8, '/posters/full-river-red.jpg', '南宋绍兴年间，岳飞死后四年，秦桧率兵与金国会谈。会谈前夜，金国使者死在宰相驻地，所携密信也不翼而飞。', 1),
('深海', 'Deep Sea', '田晓鹏', '苏鑫, 王亭文, 滕奎兴', '动画, 奇幻', '中国大陆', '汉语普通话', 112, '2023-01-22', 7.5, '/posters/deep-sea.jpg', '一位少女在神秘海底世界中追寻探索，邂逅一段独特的生命旅程的故事。', 1),
('阿凡达：水之道', 'Avatar: The Way of Water', '詹姆斯·卡梅隆', '萨姆·沃辛顿, 佐伊·索尔达娜', '科幻, 冒险', '美国', '英语', 192, '2022-12-16', 8.1, '/posters/avatar-2.jpg', '杰克和奈蒂莉组建了家庭，他们的孩子逐渐成长，为这个家庭带来了许多欢乐。然而危机未曾消散，一家人拼尽全力彼此守护、奋力求生。', 1),
('黑豹2', 'Black Panther: Wakanda Forever', '瑞恩·库格勒', '利蒂希娅·赖特, 露皮塔·尼永奥', '动作, 科幻', '美国', '英语', 161, '2023-02-07', 7.2, '/posters/black-panther-2.jpg', '特查拉国王去世后，瓦坎达陷入危机，众人必须团结起来，在娜吉雅、奥克耶、苏睿和姆巴库的帮助下开启瓦坎达的新篇章。', 0),
('蚁人与黄蜂女：量子狂潮', 'Ant-Man and the Wasp: Quantumania', '佩顿·里德', '保罗·路德, 伊万杰琳·莉莉', '动作, 科幻', '美国', '英语', 125, '2023-02-17', 7.0, '/posters/ant-man-3.jpg', '超级英雄搭档蚁人与黄蜂女首度联袂主演独立电影。两人与黄蜂女的父母以及蚁人的女儿一同深入量子领域，探索这个充满危险的未知领域。', 0);

-- 影厅数据
INSERT INTO `hall` (`name`, `type`, `row_count`, `col_count`, `seat_count`, `seat_layout`, `status`) VALUES
('1号厅（2D）', 0, 10, 15, 150, '[]', 0),
('2号厅（3D）', 1, 12, 18, 216, '[]', 0),
('3号厅（IMAX）', 2, 15, 20, 300, '[]', 0),
('4号厅（2D）', 0, 8, 12, 96, '[]', 0);

-- 排片数据（最近三天）
INSERT INTO `schedule` (`movie_id`, `hall_id`, `start_time`, `end_time`, `price`, `sold_count`, `status`) VALUES
-- 流浪地球2
(1, 3, DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 5 HOUR), 65.00, 0, 1),
(1, 2, DATE_ADD(NOW(), INTERVAL 6 HOUR), DATE_ADD(NOW(), INTERVAL 9 HOUR), 55.00, 0, 1),
(1, 1, DATE_ADD(NOW(), INTERVAL 10 HOUR), DATE_ADD(NOW(), INTERVAL 13 HOUR), 45.00, 0, 1),
-- 满江红
(2, 2, DATE_ADD(NOW(), INTERVAL 3 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 50.00, 0, 1),
(2, 1, DATE_ADD(NOW(), INTERVAL 8 HOUR), DATE_ADD(NOW(), INTERVAL 11 HOUR), 40.00, 0, 1),
-- 深海
(3, 1, DATE_ADD(NOW(), INTERVAL 4 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 42.00, 0, 1),
(3, 4, DATE_ADD(NOW(), INTERVAL 9 HOUR), DATE_ADD(NOW(), INTERVAL 11 HOUR), 38.00, 0, 1),
-- 阿凡达2
(4, 3, DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 4 HOUR), 70.00, 0, 1),
(4, 2, DATE_ADD(NOW(), INTERVAL 7 HOUR), DATE_ADD(NOW(), INTERVAL 10 HOUR), 60.00, 0, 1);

