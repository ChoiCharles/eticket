import React from 'react';
import './DetailPoster.scss';
import Img from 'assets/memphis.svg';

function DetailPoster() {
  return (
    <div className="detail-poster-container">
      {/* <div>DetailPoster</div> */}
      <img src={Img} alt="" className="poster-image" />
      <div className="poster-concert-box">
        <div className="poster-left-box">
          <img src={Img} alt="포스토 서잔" />
        </div>
        <div className="poster-right-box">
          <div>콘서트 제목</div>
          <div>콘서트 | 8세이상</div>
        </div>
      </div>
    </div>
  );
}

export default DetailPoster;
