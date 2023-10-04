import instance from 'apis/utils/instance';
import DetailContent from 'components/concertDetail/DetailContent/DetailContent';
import DetailPoster from 'components/concertDetail/DetailPoster/DetailPoster';
import ReserveButton from 'components/concertDetail/ReserveButton/ReserveButton';
import dummyConcerts from 'dummys';
import ConcertDetailLayout from 'layout/ConcertDetailLayout/ConcertDetailLayout/ConcertDetailLayout';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { dummyConcerts } from 'dummys.ts';

function ConcertDetail() {
  const { performanceId = '0' } = useParams();
  const performanceIdAsInt = parseInt(performanceId, 10);
  useEffect(() => {
    Promise.all([instance.get(`/api/performances/${performanceIdAsInt}`)])
      .then(([detailRes]) => {
        console.log('Hot Performances:', detailRes);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  // url중에서 idx에 해당하는 데이터를 axios로 받아온다.
  // 사진, 공연제목, 공연기간, 공연장, 시간 => DetailPoster
  // Notice 상세 사진, 좌석 당 가격 => DetailContent
  return (
    <ConcertDetailLayout>
      <DetailPoster info={dummyConcerts[performanceIdAsInt]} />
      <DetailContent info={dummyConcerts[performanceIdAsInt].concertdetail} />
      <ReserveButton />
    </ConcertDetailLayout>
  );
}

export default ConcertDetail;
