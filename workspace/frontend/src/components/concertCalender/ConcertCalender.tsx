import React from 'react';
import './ConcertCalender.scss';
import { useParams } from 'react-router';

function ConcertCalender() {
  const { idx } = useParams();
  console.log(idx);

  return (
    <div>
      <div>해당 캘린더</div>
    </div>
  );
}

export default ConcertCalender;
