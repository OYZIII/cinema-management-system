import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, Select, message, Popconfirm, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { movieApi } from '../../../services/api';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const AdminMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMovie, setEditingMovie] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const res = await movieApi.getMovieList({ current: 1, size: 100 });
      setMovies(res.data.records || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingMovie(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingMovie(record);
    form.setFieldsValue({
      ...record,
      releaseDate: record.releaseDate ? dayjs(record.releaseDate) : null
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await movieApi.deleteMovie(id);
      message.success('删除成功');
      loadMovies();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
        releaseDate: values.releaseDate ? values.releaseDate.format('YYYY-MM-DD') : null
      };

      if (editingMovie) {
        await movieApi.updateMovie({ ...data, id: editingMovie.id });
        message.success('更新成功');
      } else {
        await movieApi.addMovie(data);
        message.success('添加成功');
      }

      setModalVisible(false);
      loadMovies();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '电影名称', dataIndex: 'name', key: 'name' },
    { title: '导演', dataIndex: 'director', key: 'director' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '时长', dataIndex: 'duration', key: 'duration', render: (val: number) => `${val}分钟` },
    { title: '评分', dataIndex: 'rating', key: 'rating' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        const statusMap: any = { 0: '即将上映', 1: '正在热映', 2: '已下架' };
        return statusMap[status] || '未知';
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>删除</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加电影
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={movies}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingMovie ? '编辑电影' : '添加电影'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="电影名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="英文名称" name="nameEn">
            <Input />
          </Form.Item>
          <Form.Item label="导演" name="director">
            <Input />
          </Form.Item>
          <Form.Item label="主演" name="actors">
            <Input />
          </Form.Item>
          <Form.Item label="类型" name="type">
            <Input placeholder="如：动作, 科幻" />
          </Form.Item>
          <Form.Item label="地区" name="area">
            <Input />
          </Form.Item>
          <Form.Item label="语言" name="language">
            <Input />
          </Form.Item>
          <Form.Item label="时长（分钟）" name="duration">
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="上映日期" name="releaseDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="评分" name="rating">
            <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="海报链接" name="poster">
            <Input />
          </Form.Item>
          <Form.Item label="剧情简介" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="状态" name="status" rules={[{ required: true }]}>
            <Select>
              <Option value={0}>即将上映</Option>
              <Option value={1}>正在热映</Option>
              <Option value={2}>已下架</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminMovies;

