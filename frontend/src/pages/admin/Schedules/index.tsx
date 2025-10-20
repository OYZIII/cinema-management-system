import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Select, DatePicker, InputNumber, message, Popconfirm, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { scheduleApi, movieApi, hallApi } from '../../../services/api';
import dayjs from 'dayjs';

const { Option } = Select;

const AdminSchedules: React.FC = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [halls, setHalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadMovies();
    loadHalls();
  }, []);

  const loadMovies = async () => {
    try {
      const res = await movieApi.getMovieList({ current: 1, size: 100 });
      setMovies(res.data.records || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadHalls = async () => {
    try {
      const res = await hallApi.getAllHalls();
      setHalls(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss');
      const endTime = values.startTime.add(values.duration, 'minute').format('YYYY-MM-DD HH:mm:ss');

      await scheduleApi.addSchedule({
        movieId: values.movieId,
        hallId: values.hallId,
        startTime,
        endTime,
        price: values.price,
        status: 1
      });

      message.success('添加成功');
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加排片
        </Button>
      </div>

      <p>排片管理功能，可查看所有排片记录</p>

      <Modal
        title="添加排片"
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="电影" name="movieId" rules={[{ required: true }]}>
            <Select placeholder="选择电影">
              {movies.map(movie => (
                <Option key={movie.id} value={movie.id}>{movie.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="影厅" name="hallId" rules={[{ required: true }]}>
            <Select placeholder="选择影厅">
              {halls.map(hall => (
                <Option key={hall.id} value={hall.id}>{hall.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="开始时间" name="startTime" rules={[{ required: true }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="时长（分钟）" name="duration" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="票价" name="price" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminSchedules;

