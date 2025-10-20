import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Tag, Button, Carousel } from 'antd';
import { PlayCircleOutlined, ClockCircleOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { movieApi } from '../../services/api';
import './index.css';

const { Title } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [hotMovies, setHotMovies] = useState<any[]>([]);
  const [comingMovies, setComingMovies] = useState<any[]>([]);

  useEffect(() => {
    loadHotMovies();
    loadComingMovies();
  }, []);

  const loadHotMovies = async () => {
    try {
      const res = await movieApi.getHotMovies({ current: 1, size: 6 });
      setHotMovies(res.data.records || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadComingMovies = async () => {
    try {
      const res = await movieApi.getComingSoonMovies({ current: 1, size: 6 });
      setComingMovies(res.data.records || []);
    } catch (error) {
      console.error(error);
    }
  };

  const renderMovieCard = (movie: any) => (
    <Card
      key={movie.id}
      hoverable
      cover={
        <div className="movie-cover">
          <img alt={movie.name} src={movie.poster || 'https://via.placeholder.com/300x400?text=' + movie.name} />
          <div className="movie-overlay">
            <Button
              type="primary"
              shape="circle"
              icon={<PlayCircleOutlined />}
              size="large"
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
          </div>
        </div>
      }
    >
      <Card.Meta
        title={<div className="movie-title">{movie.name}</div>}
        description={
          <div>
            <div className="movie-info">
              <Tag color="blue">{movie.type}</Tag>
              {movie.rating && (
                <span className="movie-rating">
                  <StarOutlined /> {movie.rating}
                </span>
              )}
            </div>
            <div className="movie-meta">
              <ClockCircleOutlined /> {movie.duration}分钟
            </div>
          </div>
        }
      />
    </Card>
  );

  return (
    <div className="home-container">
      <Carousel autoplay className="banner">
        <div className="banner-item" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="banner-content">
            <h1>欢迎来到影院管理系统</h1>
            <p>在线选座，轻松购票</p>
          </div>
        </div>
        <div className="banner-item" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <div className="banner-content">
            <h1>海量热门影片</h1>
            <p>IMAX、3D、2D多种观影体验</p>
          </div>
        </div>
        <div className="banner-item" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
          <div className="banner-content">
            <h1>便捷的订票流程</h1>
            <p>随时随地，想看就看</p>
          </div>
        </div>
      </Carousel>

      <div className="section">
        <Title level={2}>
          <PlayCircleOutlined /> 正在热映
        </Title>
        <Row gutter={[16, 16]}>
          {hotMovies.map(movie => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={8} xl={4}>
              {renderMovieCard(movie)}
            </Col>
          ))}
        </Row>
      </div>

      <div className="section">
        <Title level={2}>
          <ClockCircleOutlined /> 即将上映
        </Title>
        <Row gutter={[16, 16]}>
          {comingMovies.map(movie => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={8} xl={4}>
              {renderMovieCard(movie)}
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;

