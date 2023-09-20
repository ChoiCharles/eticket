import DetailContent from 'components/concertDetail/DetailContent/DetailContent';
import DetailPoster from 'components/concertDetail/DetailPoster/DetailPoster';
import ReserveButton from 'components/concertDetail/ReserveButton/ReserveButton';
import ConcertDetailLayout from 'layout/ConcertDetailLayout/ConcertDetailLayout/ConcertDetailLayout';
import React from 'react';
import { useParams } from 'react-router';

function ConcertDetail() {
  const { idx } = useParams();
  console.log(idx);

  // url중에서 idx에 해당하는 데이터를 axios로 받아온다.
  return (
    <ConcertDetailLayout>
      <DetailPoster />
      <DetailContent />
      <ReserveButton />
    </ConcertDetailLayout>
  );
}

export default ConcertDetail;
