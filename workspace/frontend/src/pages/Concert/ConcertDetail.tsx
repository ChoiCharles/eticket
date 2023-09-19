import React from 'react';
import { useParams } from 'react-router-dom';

function ConcertDetail() {
  const { idx } = useParams();
  return (
    <div>
      <div>테스트</div>
      <div>{idx}</div>
    </div>
  );
}

export default ConcertDetail;
