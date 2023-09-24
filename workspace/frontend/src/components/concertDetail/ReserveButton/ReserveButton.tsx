import React from 'react';
import './ReserveButton.scss';
import { Button } from '@mui/material';
import { useParams } from 'react-router';
import useMovePage from 'hooks/useMovePage';

function ReserveButton() {
  const { movePage } = useMovePage();
  const { idx } = useParams();
  const moveReservePage = () => {
    movePage(`/ConcertCalender/${idx}`, null);
  };
  return (
    <div className="reservation-btn">
      <Button
        variant="contained"
        type="button"
        onClick={moveReservePage}
        style={{
          background: '#80C0C0',
          color: 'white',
          width: '100%',
          height: '35px',
          position: 'fixed', // 화면 하단에 고정
          bottom: '0px', // 하단 여백 조절
          left: '50%', // 가운데 정렬
          transform: 'translateX(-50%)', // 가운데 정렬,
          zIndex: '1000', // 다른 요소 위에 표시
        }}
      >
        예매하기
      </Button>
    </div>
  );
}

export default ReserveButton;
