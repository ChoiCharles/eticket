import React, { useEffect, useState } from 'react';
import './ConcertInfo.scss';
// import dummyConcerts from 'dummys';
import instance from 'apis/utils/instance';

interface Props {
  idx: number;
}
/**
 * @params 사진, 공연장, 시간,
 *
 */
function ConcertInfo({ idx }: Props) {
  console.log(idx);
  const index = parseInt(String(idx), 10) - 1;
  console.log(index);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | null>(null);
  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const startDate = data?.performanceScheduleList[0].startDateTime;
  console.log(startDate);

  const datePart = startDate?.split('T')[0];
  // console.log(datePart);

  const endDate =
    data?.performanceScheduleList[data.performanceScheduleList.length - 1]
      .startDateTime;
  console.log(endDate);

  const endDatePart = endDate?.split('T')[0];
  useEffect(() => {
    instance
      .get(`/api/performances/${index}`)
      .then(res => {
        console.log(res.data.performance.posterImagePath);
        setData(res.data.performance);
        setTitle(res.data.performance.title);
        setImg(res.data.performance.posterImagePath);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  console.log(data);
  console.log(img);

  return (
    <div className="ConcertInfo-outer-box">
      <img src={img} alt="" className="poster-image2" />
      <div className="ConcertPoster-img-box">
        <img
          src={img}
          alt="이미지"
          style={{ width: '90px', height: '120px' }}
        />
      </div>
      <div className="ConcertInformation-box">
        <div className="concert-title-text2">{title}</div>
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
