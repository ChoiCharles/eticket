import React from 'react';
import './DetailPoster.scss';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BackImg from 'assets/BackIcon.svg';
import useMovePage from 'hooks/useMovePage';

interface concertInfoTypes {
  performanceId?: number;
  image: string;
  title: string;
  location: string;
  date: string;
  concertdetail: string;
  time: string;
}

/** params: 이미지, 콘서트 제목, 캐스팅 */
function DetailPoster({ info }: { info: concertInfoTypes }) {
  const { goBack } = useMovePage();
  return (
    <div>
      {/* <BackNavBar title="" /> */}
      <div className="back-point" onClick={() => goBack()} aria-hidden>
        <img src={BackImg} alt="뒤로가기" />
      </div>
      <div className="detail-poster-container">
        {/* <div>DetailPoster</div> */}
        <img src={info.image} alt="" className="poster-image" />
        <div className="poster-concert-box">
          {/* <div>good</div> */}
          <div className="poster-left-box">
            <img
              src={info.image}
              alt="포스토 서잔"
              style={{ width: '90px', height: '120px' }}
            />
          </div>
          <div className="poster-right-box">
            <div className="concert-title-text">{info.title}</div>
            <div className="concert-time">{info.time}</div>
            <div className="concert-period-box">
              <CalendarMonthIcon sx={{ color: 'gray' }} />
              <div className="concert-period">{info.date}</div>
            </div>
            <div className="concert-location-box">
              <PlaceOutlinedIcon sx={{ color: 'gray' }} />
              <div className="concert-location">{info.location}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPoster;
