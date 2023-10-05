import React, { useEffect } from 'react';
import './SeatStage.scss';
import BackNavBar from 'components/common/BackNavBar/BackNavBar';
import { useLocation } from 'react-router-dom';

function SeatStage({ title, location }: { title: string; location: string }) {
  console.log(title);
  console.log(location);

  const URL = useLocation();
  const URLInfo = URL.pathname.split('/');
  const indexInfo = URLInfo[2];
  useEffect(() => {
    console.log(indexInfo);
  }, [URL]);

  return (
    <div>
      <BackNavBar title="좌석 예매" />
      <div className="seat-stage-container">
        <div className="concert-title3">{title}</div>
        <div className="concert-location">{location}</div>
        <div className="stage-box">STAGE BOX</div>
      </div>
    </div>
  );
}

export default SeatStage;
