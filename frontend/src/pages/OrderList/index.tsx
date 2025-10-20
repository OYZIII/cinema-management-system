import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, message, Popconfirm, Card } from 'antd';
import { orderApi } from '../../services/api';
import './index.css';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    loadOrders();
  }, [current]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await orderApi.getUserOrders({ current, size: 10 });
      setOrders(res.data.records || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (orderId: number) => {
    try {
      await orderApi.payOrder(orderId);
      message.success('支付成功');
      loadOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (orderId: number) => {
    try {
      await orderApi.cancelOrder(orderId);
      message.success('订单已取消');
      loadOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusTag = (status: number) => {
    const statusMap: any = {
      0: { text: '待支付', color: 'orange' },
      1: { text: '已支付', color: 'green' },
      2: { text: '已取消', color: 'default' },
      3: { text: '已退款', color: 'red' },
    };
    const statusInfo = statusMap[status] || { text: '未知', color: 'default' };
    return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
  };

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '座位',
      dataIndex: 'seats',
      key: 'seats',
      render: (seats: string) => {
        const seatList = JSON.parse(seats);
        return seatList.map((seat: any) => `${seat.row + 1}排${seat.col + 1}座`).join('、');
      },
    },
    {
      title: '票数',
      dataIndex: 'ticketCount',
      key: 'ticketCount',
    },
    {
      title: '总金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `¥${amount.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => getStatusTag(status),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time: string) => new Date(time).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          {record.status === 0 && (
            <>
              <Button type="primary" size="small" onClick={() => handlePay(record.id)}>
                支付
              </Button>
              <Popconfirm
                title="确认取消订单？"
                onConfirm={() => handleCancel(record.id)}
                okText="确认"
                cancelText="取消"
              >
                <Button size="small" style={{ marginLeft: 8 }}>
                  取消
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="order-list-container">
      <Card title="我的订单">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          pagination={{
            current,
            total,
            pageSize: 10,
            onChange: (page) => setCurrent(page),
          }}
        />
      </Card>
    </div>
  );
};

export default OrderList;

