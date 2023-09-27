import React from 'react';
import './Seat.scss';
import SeatSection from 'components/common/SeatSection/SeatSection';
import SeatStage from 'components/seat/SeatStage';
// import SeatStage from 'components/seat/SeatStage';

function Seat() {
  // SeatSection을 10번 반복하는 배열 생성
  const seatSections = Array(12).fill(null);

  return (
    <div>
      <SeatStage />
      <div className="seat-container">
        {/* <div className="modal-frame">good</div> */}
        {/* <SeatStage /> */}
        {seatSections.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="seat-section-wrapper">
            <SeatSection index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seat;
