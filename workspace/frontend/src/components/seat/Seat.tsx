import React from 'react';
import './Seat.scss';
import BackNavBar from 'components/common/BackNavBar/BackNavBar';

function Seat() {
  return (
    <div>
      <BackNavBar title="좌석 예매" />
      <div>
        <div>콘서트 제목</div>
        <div>콘서트 장소</div>
        <div>STAGE BOX</div>
      </div>
      <div>
        <div>좌석</div>
        <div>좌석 시트 깔기</div>
      </div>
    </div>
  );
}

export default Seat;
