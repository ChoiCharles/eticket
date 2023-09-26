import React, { useState } from 'react';
import './Calender.scss';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment';
import { Button } from '@mui/material';
import useMovePage from 'hooks/useMovePage';
import { useParams } from 'react-router-dom';

/**
 * 콘서트가 진행되는 날짜 정보
 * dayList에 넣기
 *
 */
function Calender() {
  const { movePage } = useMovePage();
  const { performanceId } = useParams();
  console.log(performanceId);

  const [today, setToday] = useState(new Date());
  const clickSelect = () => {
    movePage(`/seat/${performanceId}`, null);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCalendarChange = (date: any) => {
    if (Array.isArray(date)) {
      // 선택한 날짜 배열이라면 첫 번째 날짜를 사용
      setToday(date[0]);
    } else {
      setToday(date);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // 날짜 넣어주기
  const dayList = ['2023-09-17', '2023-09-27'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDateDisabled = ({ date }: { date: any }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return !dayList.includes(formattedDate);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  s

  // 캘린더 컴포넌트에서 년, 월, 일 선택 가능하도록 설정
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
          selectRange={false}
          //   tileContent={addContent}
          showNeighboringMonth={false}
          tileDisabled={isDateDisabled}
        />
      </div>
      <div className="selected-date">
        {moment(today).format('YYYY년 MM월 DD일')}
        <Button
          variant="contained"
          type="button"
          onClick={clickSelect}
          style={{
            background: '#80C0C0',
            color: 'white',
            borderRadius: '20px',
            width: '100px',
          }}
        >
          선택
        </Button>
      </div>
      <div className="base2-line" style={{ marginTop: '20px' }} />
      <div className="date-reservation-info">
        <div className="day-ticket-info">
          <div>1일권</div>
          <div>120,000원</div>
        </div>
        <div className="base2-line" style={{ color: 'white' }} />
      </div>
    </div>
  );
}

export default Calender;
