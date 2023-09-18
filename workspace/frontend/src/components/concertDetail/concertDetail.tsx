import React from 'react';
import './ConcertDetail.scss';
import { useParams } from 'react-router-dom';

function ConcertDetail() {
  // 이름을 대문자로 변경
  const { idx } = useParams();
  //   console.log(idx);

  return (
    <div>
      <div>{idx}</div>
    </div>
  );
}

export default ConcertDetail; // 파일 이름도 일치하도록 수정
