import request from '../utils/request';

// 用户相关接口
export const userApi = {
  // 登录
  login: (data: { username: string; password: string }) => {
    return request.post('/user/login', data);
  },
  
  // 注册
  register: (data: any) => {
    return request.post('/user/register', data);
  },
  
  // 获取当前用户信息
  getCurrentUser: () => {
    return request.get('/user/info');
  },
  
  // 更新用户信息
  updateUser: (data: any) => {
    return request.put('/user/update', data);
  },
};

// 电影相关接口
export const movieApi = {
  // 获取电影列表
  getMovieList: (params: any) => {
    return request.get('/movie/list', { params });
  },
  
  // 获取热映电影
  getHotMovies: (params: any) => {
    return request.get('/movie/hot', { params });
  },
  
  // 获取即将上映的电影
  getComingSoonMovies: (params: any) => {
    return request.get('/movie/coming', { params });
  },
  
  // 获取电影详情
  getMovieById: (id: number) => {
    return request.get(`/movie/${id}`);
  },
  
  // 添加电影
  addMovie: (data: any) => {
    return request.post('/movie/add', data);
  },
  
  // 更新电影
  updateMovie: (data: any) => {
    return request.put('/movie/update', data);
  },
  
  // 删除电影
  deleteMovie: (id: number) => {
    return request.delete(`/movie/${id}`);
  },
};

// 影厅相关接口
export const hallApi = {
  // 获取所有影厅
  getAllHalls: () => {
    return request.get('/hall/list');
  },
  
  // 获取影厅详情
  getHallById: (id: number) => {
    return request.get(`/hall/${id}`);
  },
  
  // 添加影厅
  addHall: (data: any) => {
    return request.post('/hall/add', data);
  },
  
  // 更新影厅
  updateHall: (data: any) => {
    return request.put('/hall/update', data);
  },
  
  // 删除影厅
  deleteHall: (id: number) => {
    return request.delete(`/hall/${id}`);
  },
};

// 排片相关接口
export const scheduleApi = {
  // 根据电影ID获取排片
  getSchedulesByMovieId: (movieId: number) => {
    return request.get(`/schedule/movie/${movieId}`);
  },
  
  // 获取排片详情
  getScheduleDetail: (id: number) => {
    return request.get(`/schedule/${id}`);
  },
  
  // 添加排片
  addSchedule: (data: any) => {
    return request.post('/schedule/add', data);
  },
  
  // 更新排片
  updateSchedule: (data: any) => {
    return request.put('/schedule/update', data);
  },
  
  // 删除排片
  deleteSchedule: (id: number) => {
    return request.delete(`/schedule/${id}`);
  },
};

// 订单相关接口
export const orderApi = {
  // 创建订单
  createOrder: (data: any) => {
    return request.post('/order/create', data);
  },
  
  // 取消订单
  cancelOrder: (orderId: number) => {
    return request.post(`/order/cancel/${orderId}`);
  },
  
  // 支付订单
  payOrder: (orderId: number) => {
    return request.post(`/order/pay/${orderId}`);
  },
  
  // 获取用户订单列表
  getUserOrders: (params: any) => {
    return request.get('/order/list', { params });
  },
  
  // 获取订单详情
  getOrderById: (id: number) => {
    return request.get(`/order/${id}`);
  },
};

