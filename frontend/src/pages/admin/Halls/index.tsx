import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Popconfirm, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { hallApi } from '../../../services/api';

const { Option } = Select;

const AdminHalls: React.FC = () => {
  const [halls, setHalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHall, setEditingHall] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadHalls();
  }, []);

  const loadHalls = async () => {
    setLoading(true);
    try {
      const res = await hallApi.getAllHalls();
      setHalls(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingHall(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingHall(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await hallApi.deleteHall(id);
      message.success('删除成功');
      loadHalls();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const seatCount = values.rowCount * values.colCount;

      if (editingHall) {
        await hallApi.updateHall({ ...values, id: editingHall.id, seatCount });
        message.success('更新成功');
      } else {
        await hallApi.addHall({ ...values, seatCount });
        message.success('添加成功');
      }

      setModalVisible(false);
      loadHalls();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '影厅名称', dataIndex: 'name', key: 'name' },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: number) => {
        const types = ['2D', '3D', 'IMAX'];
        return types[type] || '2D';
      }
    },
    { title: '行数', dataIndex: 'rowCount', key: 'rowCount' },
    { title: '列数', dataIndex: 'colCount', key: 'colCount' },
    { title: '座位数', dataIndex: 'seatCount', key: 'seatCount' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => status === 0 ? '正常' : '维护中'
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
          添加影厅
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={halls}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingHall ? '编辑影厅' : '添加影厅'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="影厅名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="类型" name="type" rules={[{ required: true }]}>
            <Select>
              <Option value={0}>2D</Option>
              <Option value={1}>3D</Option>
              <Option value={2}>IMAX</Option>
            </Select>
          </Form.Item>
          <Form.Item label="行数" name="rowCount" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="列数" name="colCount" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="状态" name="status" rules={[{ required: true }]}>
            <Select>
              <Option value={0}>正常</Option>
              <Option value={1}>维护中</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminHalls;

