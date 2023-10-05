import instance from 'apis/utils/instance';
import DetailContent from 'components/concertDetail/DetailContent/DetailContent';
import DetailPoster from 'components/concertDetail/DetailPoster/DetailPoster';
import ReserveButton from 'components/concertDetail/ReserveButton/ReserveButton';
import ConcertDetailLayout from 'layout/ConcertDetailLayout/ConcertDetailLayout/ConcertDetailLayout';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { dummyConcerts } from 'dummys.ts';

function ConcertDetail() {
  const { performanceId = '0' } = useParams();
  console.log(performanceId);
  const [value, setData] = useState('');

  useEffect(() => {
    instance
      .get(`/api/performances/${performanceId}`)
      .then(response => {
        console.log(response);
        console.log(response.data.performance);
        setData(response.data.performance);
        // const concertListData = hotRes;
      })
      .catch(error => console.error('Error:', error));
  }, []);
  console.log(value);

  // url중에서 idx에 해당하는 데이터를 axios로 받아온다.
  // 사진, 공연제목, 공연기간, 공연장, 시간 => DetailPoster
  // Notice 상세 사진, 좌석 당 가격 => DetailContent
  return (
    <ConcertDetailLayout>
      {value && <DetailPoster info={value} />}
      {value && <DetailContent info={value} />}
      <ReserveButton />
    </ConcertDetailLayout>
  );
}

export default ConcertDetail;
