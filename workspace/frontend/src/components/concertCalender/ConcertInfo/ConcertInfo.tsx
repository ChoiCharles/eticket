import React, { useEffect } from 'react';
import './ConcertInfo.scss';
import dummyConcerts from 'dummys';
import instance from 'apis/utils/instance';
/**
 * @params 사진, 공연장, 시간,
 *
 */
function ConcertInfo({ idx }: { idx: string }) {
  useEffect(() => {
    Promise.all([instance.get('/api/performances/hot')])
      .then(([hotRes]) => {
        console.log('Hot Performances:', hotRes);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  const index = parseInt(idx, 10);
  return (
    <div className="ConcertInfo-outer-box">
      <img src={dummyConcerts[index].image} alt="" className="poster-image2" />
      <div className="ConcertPoster-img-box">
        {/* 공연장 포스터 */}
        <img
          src={dummyConcerts[index].image}
          alt="이미지"
          style={{ width: '90px', height: '120px' }}
        />
      </div>
      <div className="ConcertInformation-box">
        <div className="concert-title-text2">{dummyConcerts[index].title}</div>
        <div className="concert-time2">{dummyConcerts[index].date}</div>
        <div className="concert-time2">{dummyConcerts[index].time}</div>
        <div className="concert-period-box2">
          {dummyConcerts[index].location}
        </div>
      </div>
    </div>
  );
}

export default ConcertInfo;
