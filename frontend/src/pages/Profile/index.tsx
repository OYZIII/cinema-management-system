import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userApi } from '../../services/api';
import './index.css';

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    setLoading(true);
    try {
      const res = await userApi.getCurrentUser();
      setUser(res.data);
      form.setFieldsValue(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await userApi.updateUser(values);
      message.success('更新成功');
      const updatedUser = { ...user, ...values };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <Card title="个人信息">
        <div className="profile-header">
          <Avatar size={80} icon={<UserOutlined />} />
          <div className="user-info">
            <h2>{user?.username}</h2>
            <p>{user?.role === 1 ? '管理员' : '普通用户'}</p>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 32 }}
        >
          <Form.Item label="用户名" name="username">
            <Input disabled />
          </Form.Item>

          <Form.Item label="真实姓名" name="realName">
            <Input />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { type: 'email', message: '邮箱格式不正确' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;

