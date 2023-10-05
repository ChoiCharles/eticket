import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Calender.scss';
import Calendar from 'react-calendar';
import moment from 'moment';
import { Button } from '@mui/material';
import useMovePage from 'hooks/useMovePage';
import { useParams } from 'react-router-dom';
import instance from 'apis/utils/instance';

type Item = {
  id: { value: number };
  performanceScheduleList: string[];
  posterImagePath: string;
  ticketingOpenDateTime: string;
  title: string;
};
interface Props {
  idx: number;
}
function Calender({ idx }: Props) {
  console.log(idx);
  const [data, setData] = useState<Item | null>(null);
  useEffect(() => {
    instance
      .get('/api/performances/hot')
      .then(hotRes => {
        console.log('Hot Performances:', hotRes.data.hotPerformanceList[idx]);
        const reList = hotRes.data.hotPerformanceList.reverse();
        setData(reList[idx]);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  // console.log(data?.performanceScheduleList);
  const startDate = data?.performanceScheduleList[0];
  const endDate = data?.performanceScheduleList[1];
  // const startMoment = moment(startDate);
  // const endMoment = moment(endDate);
  const dayList = [startDate, endDate];

  const { movePage } = useMovePage();
  const { performanceScheduleId } = useParams();
  const [today, setToday] = useState(new Date());
  const [selectedDayIndex, setSelectedDayIndex] = useState(-1);
  // console.log(dayList);

  const clickSelect = () => {
    if (selectedDayIndex !== -1) {
      movePage(`/waiting/${performanceScheduleId}/${selectedDayIndex}`, null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCalendarChange = (date: any) => {
    if (Array.isArray(date)) {
      setToday(date[0]);
      const formattedDate = moment(date[0]).format('YYYY-MM-DD');
      setSelectedDayIndex(dayList.indexOf(formattedDate));
    } else {
      setToday(date);
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setSelectedDayIndex(dayList.indexOf(formattedDate));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDateDisabled = ({ date }: { date: any }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return !dayList.includes(formattedDate);
  };

  return (
    <div className="calendar-outer-box">
      <div className="calendar-inner-box">
        <Calendar
          onChange={onCalendarChange}
          value={today}
          minDetail="month"
          maxDetail="month"
          next2Label={null}
          prev2Label={null}
          calendarType="hebrew"
          // selectRange={false}
          showNeighboringMonth={false}
          tileDisabled={isDateDisabled}
          formatDay={(_locale, date) => moment(date).format('DD')}
        />
      </div>
      <div className="selected-date">
        {moment(today).format('YYYY년 MM월 DD일')}
        <Button
          variant="contained"
          type="button"
          onClick={clickSelect}
          style={{
            background: selectedDayIndex !== -1 ? '#80C0C0' : 'gray',
            color: 'white',
            borderRadius: '20px',
            width: '100px',
            pointerEvents: selectedDayIndex !== -1 ? 'auto' : 'none',
          }}
        >
          선택
        </Button>
      </div>
      <div className="base2-line" style={{ marginTop: '20px' }} />
      <div className="date-reservation-info">
        <div className="day-ticket-info">
          <div>VIP</div>
          <div>150,000원</div>
        </div>
        <div className="base2-line" style={{ color: 'white' }} />
        <div className="day-ticket-info">
          <div>BASIC</div>
          <div>80,000원</div>
        </div>
        <div className="base2-line" style={{ color: 'white' }} />
      </div>
    </div>
  );
}

export default Calender;
