import React from 'react';
import './DetailPoster.scss';
import Img from 'assets/memphis.svg';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

/** params: 이미지, 콘서트 제목, 캐스팅 */
function DetailPoster() {
  return (
    <div className="detail-poster-container">
      {/* <div>DetailPoster</div> */}
      <img src={Img} alt="" className="poster-image" />
      <div className="poster-concert-box">
        <div className="poster-left-box">
          <img src={Img} alt="포스토 서잔" />
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
