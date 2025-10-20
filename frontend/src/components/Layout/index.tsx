import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Layout as AntLayout, Menu, Dropdown, Avatar, message, Button } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined, VideoCameraOutlined, ShoppingOutlined, DashboardOutlined } from '@ant-design/icons';
import './index.css';

const { Header, Content, Footer } = AntLayout;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('退出成功');
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: '我的订单',
      onClick: () => navigate('/orders'),
    },
    ...(user?.role === 1 ? [{
      key: 'admin',
      icon: <DashboardOutlined />,
      label: '管理后台',
      onClick: () => navigate('/admin'),
    }] : []),
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <AntLayout className="layout">
      <Header className="header">
        <div className="logo">
          <VideoCameraOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
          影院管理系统
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          className="menu"
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="movies" icon={<VideoCameraOutlined />}>
            <Link to="/movies">影片</Link>
          </Menu.Item>
        </Menu>
        <div className="user-info">
          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="user-avatar">
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: '8px' }}>{user.username}</span>
              </div>
            </Dropdown>
          ) : (
            <div>
              <Button type="link" onClick={() => navigate('/login')} style={{ color: '#fff', marginRight: '16px' }}>
                登录
              </Button>
              <Button type="link" onClick={() => navigate('/register')} style={{ color: '#fff' }}>
                注册
              </Button>
            </div>
          )}
        </div>
      </Header>
      <Content className="content">
        <div className="content-inner">
          <Outlet />
        </div>
      </Content>
      <Footer className="footer">
        影院管理系统 ©2024 Created by OYZIII
      </Footer>
    </AntLayout>
  );
};

export default Layout;

