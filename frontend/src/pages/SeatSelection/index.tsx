import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, message, Descriptions, Tag } from 'antd';
import { scheduleApi, orderApi } from '../../services/api';
import './index.css';

const SeatSelection: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const [scheduleDetail, setScheduleDetail] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scheduleId) {
      loadScheduleDetail();
    }
  }, [scheduleId]);

  const loadScheduleDetail = async () => {
    setLoading(true);
    try {
      const res = await scheduleApi.getScheduleDetail(Number(scheduleId));
      setScheduleDetail(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isSeatSold = (row: number, col: number) => {
    return scheduleDetail?.soldSeats?.includes(`${row}-${col}`);
  };

  const isSeatSelected = (row: number, col: number) => {
    return selectedSeats.some(seat => seat.row === row && seat.col === col);
  };

  const handleSeatClick = (row: number, col: number) => {
    if (isSeatSold(row, col)) {
      return;
    }

    if (isSeatSelected(row, col)) {
      setSelectedSeats(selectedSeats.filter(seat => !(seat.row === row && seat.col === col)));
    } else {
      setSelectedSeats([...selectedSeats, { row, col }]);
    }
  };

  const handleSubmit = async () => {
    if (selectedSeats.length === 0) {
      message.warning('请选择座位');
      return;
    }

    setLoading(true);
    try {
      await orderApi.createOrder({
        scheduleId: Number(scheduleId),
        seats: selectedSeats
      });
      message.success('订单创建成功');
      navigate('/orders');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderSeats = () => {
    if (!scheduleDetail?.hall) return null;

    const { rowCount, colCount } = scheduleDetail.hall;
    const seats = [];

    for (let row = 0; row < rowCount; row++) {
      const rowSeats = [];
      for (let col = 0; col < colCount; col++) {
        const sold = isSeatSold(row, col);
        const selected = isSeatSelected(row, col);
        let className = 'seat';
        if (sold) className += ' seat-sold';
        else if (selected) className += ' seat-selected';

        rowSeats.push(
          <div
            key={`${row}-${col}`}
            className={className}
            onClick={() => handleSeatClick(row, col)}
          >
            {col + 1}
          </div>
        );
      }
      seats.push(
        <div key={row} className="seat-row">
          <div className="row-label">{row + 1}排</div>
          {rowSeats}
        </div>
      );
    }

    return seats;
  };

  if (loading || !scheduleDetail) {
    return <Card loading={true} />;
  }

  const { movie, schedule, hall } = scheduleDetail;
  const totalPrice = selectedSeats.length * schedule.price;

  return (
    <div className="seat-selection-container">
      <Card title="选择座位" loading={loading}>
        <Descriptions column={2} style={{ marginBottom: 24 }}>
          <Descriptions.Item label="电影">{movie.name}</Descriptions.Item>
          <Descriptions.Item label="影厅">{hall.name}</Descriptions.Item>
          <Descriptions.Item label="放映时间">
            {new Date(schedule.startTime).toLocaleString('zh-CN')}
          </Descriptions.Item>
          <Descriptions.Item label="票价">¥{schedule.price}</Descriptions.Item>
        </Descriptions>

        <div className="screen">银幕中央</div>

        <div className="seats-container">
          {renderSeats()}
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="seat seat-available"></div>
            <span>可选</span>
          </div>
          <div className="legend-item">
            <div className="seat seat-selected"></div>
            <span>已选</span>
          </div>
          <div className="legend-item">
            <div className="seat seat-sold"></div>
            <span>已售</span>
          </div>
        </div>

        <div className="order-summary">
          <div className="selected-info">
            <span>已选座位：</span>
            {selectedSeats.length > 0 ? (
              <span>
                {selectedSeats.map(seat => `${seat.row + 1}排${seat.col + 1}座`).join('、')}
              </span>
            ) : (
              <span>未选择</span>
            )}
          </div>
          <div className="price-info">
            <span>总价：</span>
            <span className="total-price">¥{totalPrice.toFixed(2)}</span>
          </div>
          <Button
            type="primary"
            size="large"
            disabled={selectedSeats.length === 0}
            loading={loading}
            onClick={handleSubmit}
          >
            确认购买
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SeatSelection;

