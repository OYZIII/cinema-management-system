import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Select, Pagination, Tag, Button } from 'antd';
import { PlayCircleOutlined, SearchOutlined, StarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { movieApi } from '../../services/api';
import './index.css';

const { Search } = Input;
const { Option } = Select;

const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies();
  }, [current, status]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const res = await movieApi.getMovieList({
        current,
        size: 12,
        keyword,
        status
      });
      setMovies(res.data.records || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setKeyword(value);
    setCurrent(1);
    loadMovies();
  };

  const handleStatusChange = (value: number | undefined) => {
    setStatus(value);
    setCurrent(1);
  };

  return (
    <div className="movie-list-container">
      <div className="filter-bar">
        <Search
          placeholder="搜索电影名称、导演、演员"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          style={{ width: 400 }}
        />
        <Select
          placeholder="筛选状态"
          allowClear
          size="large"
          style={{ width: 200, marginLeft: 16 }}
          onChange={handleStatusChange}
        >
          <Option value={0}>即将上映</Option>
          <Option value={1}>正在热映</Option>
          <Option value={2}>已下架</Option>
        </Select>
      </div>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {movies.map(movie => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              loading={loading}
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
                      <Tag color={movie.status === 1 ? 'red' : 'blue'}>
                        {movie.status === 0 ? '即将上映' : movie.status === 1 ? '正在热映' : '已下架'}
                      </Tag>
                      {movie.rating && (
                        <span className="movie-rating">
                          <StarOutlined /> {movie.rating}
                        </span>
                      )}
                    </div>
                    <div className="movie-meta">
                      <div><ClockCircleOutlined /> {movie.duration}分钟</div>
                      <div>{movie.type}</div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div className="pagination-container">
        <Pagination
          current={current}
          total={total}
          pageSize={12}
          onChange={(page) => setCurrent(page)}
          showTotal={(total) => `共 ${total} 部电影`}
        />
      </div>
    </div>
  );
};

export default MovieList;

