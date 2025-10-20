import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import SeatSelection from './pages/SeatSelection';
import OrderList from './pages/OrderList';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMovies from './pages/admin/Movies';
import AdminHalls from './pages/admin/Halls';
import AdminSchedules from './pages/admin/Schedules';
import AdminOrders from './pages/admin/Orders';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<MovieList />} />
            <Route path="movie/:id" element={<MovieDetail />} />
            <Route path="seat/:scheduleId" element={<SeatSelection />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/movies" element={<AdminMovies />} />
            <Route path="admin/halls" element={<AdminHalls />} />
            <Route path="admin/schedules" element={<AdminSchedules />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;

