import React from 'react';
import './ReserveButton.scss';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router';

function ReserveButton() {
  const navigate = useNavigate();
  const { idx } = useParams();
  const moveReservePage = () => {
    navigate(`/ConcertCalender/${idx}`);
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
        }}
      >
        예매하기
      </Button>
    </div>
  );
}

export default ReserveButton;
