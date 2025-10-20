# 影院管理系统 API 文档

## 基础说明

- 基础URL: `http://localhost:8080/api`
- 响应格式: JSON
- 需要认证的接口需要在请求头中添加 `Authorization` 字段，值为登录后获取的 token

## 统一响应格式

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

## 用户模块

### 1. 用户注册

**接口地址:** `POST /user/register`

**请求参数:**

```json
{
  "username": "string",
  "password": "string",
  "realName": "string",
  "phone": "string",
  "email": "string"
}
```

**响应示例:**

```json
{
  "code": 200,
  "message": "注册成功",
  "data": null
}
```

### 2. 用户登录

**接口地址:** `POST /user/login`

**请求参数:**

```json
{
  "username": "string",
  "password": "string"
}
```

**响应示例:**

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "realName": "管理员",
      "phone": "13800138000",
      "email": "admin@cinema.com",
      "role": 1
    }
  }
}
```

### 3. 获取当前用户信息

**接口地址:** `GET /user/info`

**请求头:** `Authorization: {token}`

**响应示例:**

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "id": 1,
    "username": "admin",
    "realName": "管理员",
    "phone": "13800138000",
    "email": "admin@cinema.com",
    "role": 1
  }
}
```

## 电影模块

### 1. 获取电影列表

**接口地址:** `GET /movie/list`

**请求参数:**

- `current`: 页码（默认1）
- `size`: 每页数量（默认10）
- `keyword`: 搜索关键字（可选）
- `status`: 状态筛选（可选，0-即将上映 1-正在热映 2-已下架）

**响应示例:**

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "records": [...],
    "total": 100,
    "current": 1,
    "size": 10
  }
}
```

### 2. 获取热映电影

**接口地址:** `GET /movie/hot`

**请求参数:**

- `current`: 页码
- `size`: 每页数量

### 3. 获取即将上映电影

**接口地址:** `GET /movie/coming`

**请求参数:**

- `current`: 页码
- `size`: 每页数量

### 4. 获取电影详情

**接口地址:** `GET /movie/{id}`

**路径参数:**

- `id`: 电影ID

### 5. 添加电影（管理员）

**接口地址:** `POST /movie/add`

**请求头:** `Authorization: {token}`

**请求参数:**

```json
{
  "name": "流浪地球2",
  "nameEn": "The Wandering Earth II",
  "director": "郭帆",
  "actors": "吴京, 刘德华",
  "type": "科幻, 灾难",
  "area": "中国大陆",
  "language": "汉语普通话",
  "duration": 173,
  "releaseDate": "2023-01-22",
  "rating": 8.3,
  "poster": "/posters/wandering-earth-2.jpg",
  "description": "剧情简介...",
  "status": 1
}
```

## 影厅模块

### 1. 获取所有影厅

**接口地址:** `GET /hall/list`

### 2. 添加影厅（管理员）

**接口地址:** `POST /hall/add`

**请求头:** `Authorization: {token}`

**请求参数:**

```json
{
  "name": "1号厅（2D）",
  "type": 0,
  "rowCount": 10,
  "colCount": 15,
  "status": 0
}
```

## 排片模块

### 1. 根据电影ID获取排片

**接口地址:** `GET /schedule/movie/{movieId}`

**响应示例:**

```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "date": "2024-01-20",
      "schedules": [
        {
          "id": 1,
          "startTime": "2024-01-20 10:00:00",
          "endTime": "2024-01-20 12:53:00",
          "price": 65.00,
          "hallName": "3号厅（IMAX）",
          "hallType": 2,
          "soldCount": 50,
          "totalCount": 300
        }
      ]
    }
  ]
}
```

### 2. 获取排片详情

**接口地址:** `GET /schedule/{id}`

**响应示例:**

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "schedule": {...},
    "movie": {...},
    "hall": {...},
    "soldSeats": ["0-5", "0-6", "1-5"]
  }
}
```

### 3. 添加排片（管理员）

**接口地址:** `POST /schedule/add`

**请求头:** `Authorization: {token}`

**请求参数:**

```json
{
  "movieId": 1,
  "hallId": 1,
  "startTime": "2024-01-20 10:00:00",
  "endTime": "2024-01-20 12:53:00",
  "price": 65.00,
  "status": 1
}
```

## 订单模块

### 1. 创建订单

**接口地址:** `POST /order/create`

**请求头:** `Authorization: {token}`

**请求参数:**

```json
{
  "scheduleId": 1,
  "seats": [
    {"row": 5, "col": 10},
    {"row": 5, "col": 11}
  ]
}
```

### 2. 支付订单

**接口地址:** `POST /order/pay/{orderId}`

**请求头:** `Authorization: {token}`

### 3. 取消订单

**接口地址:** `POST /order/cancel/{orderId}`

**请求头:** `Authorization: {token}`

### 4. 获取用户订单列表

**接口地址:** `GET /order/list`

**请求头:** `Authorization: {token}`

**请求参数:**

- `current`: 页码
- `size`: 每页数量

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/token失效 |
| 403 | 无权限访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

