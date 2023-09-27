import React from 'react';
import './SeatItem.scss';
// import { useLocation } from 'react-router-dom';
import SeatDummy from 'seatDummy';
import SeatBox from 'components/seat/SeatBox/SeatBox';

function SeatItem({ index }: { index: number }) {
  // axios로 해당하는 section의 좌석 리스트 받아오기
  // const URL = useLocation();
  // const URLInfo = URL.pathname.split('/');
  // const indexInfo = URLInfo[2];
  // useEffect(() => {
  //   console.log(indexInfo);
  // }, [URL]);

  const data = SeatDummy[index].seat;
  console.log(data);

  return (
    <div>
      <div>{index}</div>
      <div className="seat-item-container2">
        {/* <SeatBox /> */}
        {/* <div> 몇 번째 좌석 </div> */}
        {/* <div>버튼</div> */}
        {data.map((_, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx} className="seat-section-wrapper">
            <SeatBox index={idx} state={_} />
          </div>
        ))}
        {/* <div onClick={selectSeat} className="seat-section-box" aria-hidden /> */}
      </div>
    </div>
  );
}

export default SeatItem;
