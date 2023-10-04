import React, { useEffect } from 'react';
import './Seat.scss';
import SeatSection from 'components/common/SeatSection/SeatSection';
import SeatStage from 'components/seat/SeatStage';
import SeatDummy from 'seatDummy';
import instance from 'apis/utils/instance';
// import seatClassDummy from 'seatClassDummy';
// import seatClassRelation from 'seatClassRelation';

function Seat() {
  const seatSections = SeatDummy.length;
  useEffect(() => {
    instance
      .get(`/api/performances/test`)
      .then(response => {
        console.log(response);
        // console.log(response.data.performance);
        // setData(response.data.performance);
        // const concertListData = hotRes;
      })
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <div>
      <SeatStage />
      <div className="seat-outer-box">
        <div className="seat-container">
          {Array(seatSections)
            .fill(null)
            .map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="seat-section-wrapper">
                <SeatSection index={index} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Seat;
