import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Tag, Button, Divider, List, Empty } from 'antd';
import { ClockCircleOutlined, CalendarOutlined, StarOutlined } from '@ant-design/icons';
import { movieApi, scheduleApi } from '../../services/api';
import './index.css';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadMovieDetail();
      loadSchedules();
    }
  }, [id]);

  const loadMovieDetail = async () => {
    setLoading(true);
    try {
      const res = await movieApi.getMovieById(Number(id));
      setMovie(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadSchedules = async () => {
    try {
      const res = await scheduleApi.getSchedulesByMovieId(Number(id));
      setSchedules(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyTicket = (scheduleId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/seat/${scheduleId}`);
  };

  const getHallType = (type: number) => {
    const types = ['2D', '3D', 'IMAX'];
    return types[type] || '2D';
  };

  if (loading || !movie) {
    return <Card loading={loading} />;
  }

  return (
    <div className="movie-detail-container">
      <Card>
        <div className="movie-header">
          <div className="movie-poster">
            <img src={movie.poster || 'https://via.placeholder.com/300x400?text=' + movie.name} alt={movie.name} />
          </div>
          <div className="movie-info-detail">
            <h1>{movie.name}</h1>
            {movie.nameEn && <h3>{movie.nameEn}</h3>}
            <div className="movie-tags">
              <Tag color="blue">{movie.type}</Tag>
              <Tag color="green">{movie.area}</Tag>
              <Tag color="orange">{movie.language}</Tag>
              {movie.status === 1 && <Tag color="red">正在热映</Tag>}
              {movie.status === 0 && <Tag color="blue">即将上映</Tag>}
            </div>
            {movie.rating && (
              <div className="movie-rating-large">
                <StarOutlined style={{ color: '#faad14', fontSize: '32px' }} />
                <span style={{ fontSize: '48px', fontWeight: 'bold', marginLeft: '16px' }}>{movie.rating}</span>
              </div>
            )}
            <Descriptions column={1} style={{ marginTop: '24px' }}>
              <Descriptions.Item label="导演">{movie.director}</Descriptions.Item>
              <Descriptions.Item label="主演">{movie.actors}</Descriptions.Item>
              <Descriptions.Item label="时长">
                <ClockCircleOutlined /> {movie.duration}分钟
              </Descriptions.Item>
              <Descriptions.Item label="上映日期">
                <CalendarOutlined /> {movie.releaseDate}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>

        <Divider />

        <div className="movie-description">
          <h2>剧情简介</h2>
          <p>{movie.description}</p>
        </div>

        <Divider />

        <div className="movie-schedules">
          <h2>排片信息</h2>
          {schedules.length > 0 ? (
            schedules.map((daySchedule: any, index: number) => (
              <div key={index} className="day-schedule">
                <h3>{daySchedule.date}</h3>
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }}
                  dataSource={daySchedule.schedules}
                  renderItem={(schedule: any) => (
                    <List.Item>
                      <Card
                        size="small"
                        hoverable
                        onClick={() => handleBuyTicket(schedule.id)}
                      >
                        <div className="schedule-time">
                          {new Date(schedule.startTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="schedule-hall">
                          {schedule.hallName} ({getHallType(schedule.hallType)})
                        </div>
                        <div className="schedule-price">
                          ¥{schedule.price}
                        </div>
                        <div className="schedule-seats">
                          余{schedule.totalCount - schedule.soldCount}座
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            ))
          ) : (
            <Empty description="暂无排片信息" />
          )}
        </div>
      </Card>
    </div>
  );
};

export default MovieDetail;

