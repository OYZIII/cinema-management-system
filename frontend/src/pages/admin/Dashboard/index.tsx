import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, VideoCameraOutlined, ShoppingOutlined, DollarOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import './index.css';

const AdminDashboard: React.FC = () => {
  // 票房趋势图配置
  const boxOfficeOption = {
    title: { text: '近7天票房趋势' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: { type: 'value' },
    series: [{
      data: [12000, 15000, 13000, 17000, 22000, 28000, 25000],
      type: 'line',
      smooth: true,
      areaStyle: {}
    }]
  };

  // 电影销售占比
  const movieSalesOption = {
    title: { text: '电影销售占比' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: '60%',
      data: [
        { value: 335, name: '流浪地球2' },
        { value: 310, name: '满江红' },
        { value: 234, name: '深海' },
        { value: 200, name: '阿凡达2' },
        { value: 150, name: '其他' }
      ]
    }]
  };

  return (
    <div className="admin-dashboard">
      <h1>数据统计</h1>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在映影片"
              value={24}
              prefix={<VideoCameraOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总订单数"
              value={5680}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总票房"
              value={358920}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <ReactECharts option={boxOfficeOption} style={{ height: '400px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <ReactECharts option={movieSalesOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;

