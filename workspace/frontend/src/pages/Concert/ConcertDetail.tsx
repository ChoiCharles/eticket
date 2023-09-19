import DetailContent from 'components/concertDetail/DetailContent/DetailContent';
import DetailPoster from 'components/concertDetail/DetailPoster/DetailPoster';
import ConcertDetailLayout from 'layout/ConcertDetailLayout/ConcertDetailLayout/ConcertDetailLayout';
import React from 'react';
// import { useParams } from 'react-router-dom';

function ConcertDetail() {
  // const { idx } = useParams();
  // url중에서 idx에 해당하는 데이터를 axios로 받아온다.
  return (
    <ConcertDetailLayout>
      <DetailPoster />
      <DetailContent />
    </ConcertDetailLayout>
  );
}

export default ConcertDetail;
