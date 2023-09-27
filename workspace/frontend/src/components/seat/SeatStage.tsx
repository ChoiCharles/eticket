import React, { useEffect } from 'react';
import './SeatStage.scss';
import BackNavBar from 'components/common/BackNavBar/BackNavBar';
import dummyConcerts from 'dummys';
import { useLocation } from 'react-router-dom';

function SeatStage() {
  const URL = useLocation();
  const URLInfo = URL.pathname.split('/');
  const indexInfo = URLInfo[2];
  useEffect(() => {
    console.log(indexInfo);
  }, [URL]);

  const data = dummyConcerts[parseInt(indexInfo, 10)];
  console.log(data);

  return (
    <div>
      <BackNavBar title="좌석 예매" />
      <div className="seat-stage-container">
        <div className="concert-title3">{data.title}</div>
        <div className="concert-location">{data.location}</div>
        <div className="stage-box">STAGE BOX</div>
      </div>
    </div>
  );
}

export default SeatStage;
