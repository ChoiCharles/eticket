import React from 'react';
import './ConcertInfo.scss';
import concertImg from 'assets/memphis.svg';

/**
 * @params 사진, 공연장, 시간,
 *
 */
function ConcertInfo() {
  return (
    <div className="ConcertInfo-outer-box">
      {/* <img src={concertImg} alt="" className="poster-image" /> */}
      <div className="ConcertPoster-img-box">
        {/* 공연장 포스터 */}
        <img src={concertImg} alt="이미지" />
      </div>
      <div className="ConcertInformation-box">
        <div className="concert-title-text2">공연 제목</div>
        <div className="concert-time2">2023-09-30 19:00 ~ 23: 00</div>
        <div className="concert-period-box2">
          서울 잠실종합운동장 올림픽 경기장
        </div>
      </div>
    </div>
  );
}

export default ConcertInfo;
