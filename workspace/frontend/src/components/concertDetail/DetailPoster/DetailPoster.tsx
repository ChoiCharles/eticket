import React from 'react';
import './DetailPoster.scss';
// import Img from 'assets/memphis.svg';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
// import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

/** params: 이미지, 콘서트 제목, 캐스팅 */
function DetailPoster() {
  const { performanceId } = useParams();
  console.log(performanceId);

  return (
    <div className="detail-poster-container">
      {/* <div>DetailPoster</div> */}
      <img
        src="https://tickets.interpark.com/contents/_next/image?url=https%3A%2F%2Fticketimage.interpark.com%2FPlay%2Fimage%2Flarge%2F23%2F23013495_p.gif&w=750&q=75"
        alt=""
        className="poster-image"
      />
      <div className="good">good</div>
      <div className="poster-concert-box">
        {/* <div>good</div> */}
        <div className="poster-left-box">
          <img
            src="https://tickets.interpark.com/contents/_next/image?url=https%3A%2F%2Fticketimage.interpark.com%2FPlay%2Fimage%2Flarge%2F23%2F23013495_p.gif&w=750&q=75"
            alt="포스토 서잔"
            style={{ width: '90px', height: '120px' }}
          />
        </div>
        <div className="poster-right-box">
          <div className="concert-title-text">공연제목</div>
          <div className="concert-time">16:30 ~ 21:00</div>
          <div className="concert-period-box">
            <CalendarMonthIcon sx={{ color: 'gray' }} />
            <div className="concert-period">공연기간</div>
          </div>
          <div className="concert-location-box">
            <PlaceOutlinedIcon sx={{ color: 'gray' }} />
            <div className="concert-location">공연장</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPoster;
