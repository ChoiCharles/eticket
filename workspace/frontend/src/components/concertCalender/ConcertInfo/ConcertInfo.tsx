import React, { useEffect, useState } from 'react';
import './ConcertInfo.scss';
// import dummyConcerts from 'dummys';
import instance from 'apis/utils/instance';

type Item = {
  id: { value: number };
  performanceScheduleList: string[];
  posterImagePath: string;
  ticketingOpenDateTime: string;
  title: string;
};

interface Props {
  idx: number;
}
/**
 * @params 사진, 공연장, 시간,
 *
 */
function ConcertInfo({ idx }: Props) {
  const [data, setData] = useState<Item | null>(null);
  const startDate = data?.performanceScheduleList[0];
  const datePart = startDate?.split('T')[0];
  const endDate =
    data?.performanceScheduleList[data.performanceScheduleList.length - 1];
  const endDatePart = endDate?.split('T')[0];
  useEffect(() => {
    instance
      .get('/api/performances/hot')
      .then(hotRes => {
        console.log('Hot Performances:', hotRes.data.hotPerformanceList[idx]);
        const reList = hotRes.data.hotPerformanceList.reverse();
        setData(reList[idx]);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  console.log(data);

  return (
    <div className="ConcertInfo-outer-box">
      <img src={data?.posterImagePath} alt="" className="poster-image2" />
      <div className="ConcertPoster-img-box">
        <img
          src={data?.posterImagePath}
          alt="이미지"
          style={{ width: '90px', height: '120px' }}
        />
      </div>
      <div className="ConcertInformation-box">
        <div className="concert-title-text2">{data?.title}</div>
        <div className="concert-time2">
          {datePart} ~ {endDatePart}
        </div>
        {/* <div className="concert-time2">{dummyConcerts[idx].time}</div> */}
        <div className="concert-period-box2">
          {/* {dummyConcerts[idx].location} */}
        </div>
      </div>
    </div>
  );
}

export default ConcertInfo;
