import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import './SeatBox.scss';
import SelectSeatState from 'atoms/SelectSeatState';

function SeatBox({ index, state }: { index: number; state: number }) {
  const [isSelected, setIsSelected] = useState(false);
  const [, setSelectedSeats] = useRecoilState(SelectSeatState);

  const handleClick = () => {
    // console.log(selectedSeats);

    // 인덱스 값이 0일 때만 클릭 가능하도록
    if (state === 0) {
      setIsSelected(!isSelected);

      // 선택한 좌석을 추가 또는 제거
      if (isSelected) {
        setSelectedSeats(prevSelectedSeats =>
          prevSelectedSeats.filter(seat => seat !== index),
        );
      } else {
        setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, index]);
      }
    }
  };

  // 인덱스 값에 따라 색상 지정
  const boxStyle = {
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: state === 1 ? '#ccc' : isSelected ? '#80c0c0' : 'white',
    color: isSelected && state !== 1 ? 'white' : 'black',
    cursor: state === 0 ? 'pointer' : 'not-allowed',
  };

  return (
    <div>
      <div>
        <div
          className="seat-box"
          style={boxStyle}
          onClick={handleClick}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default SeatBox;
