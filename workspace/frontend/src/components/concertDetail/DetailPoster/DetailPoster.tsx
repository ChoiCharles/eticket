import React from 'react';
import './DetailPoster.scss';
// import Img from 'assets/memphis.svg';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
// import BackNavBar from 'components/common/BackNavBar/BackNavBar';
// import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

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
function DetailPoster(
  { info }: { info: concertInfoTypes },
  // title: string,
  // location: string,
  // date: string,
  // time: string,
  // image: string,
) {
  const { performanceId } = useParams();
  console.log(performanceId);

  return (
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
  );
}

export default DetailPoster;
