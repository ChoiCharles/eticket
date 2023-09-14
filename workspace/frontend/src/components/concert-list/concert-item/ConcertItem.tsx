import React from 'react';
import './ConcertItem.scss';

interface ConcertListItem {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
}

function ConcertItem({ concertInfo }: { concertInfo: ConcertListItem }) {
  return (
    <div className="concert-item-outer-box">
      <div className="concert-left-box">
        <img
          className="rank-frame concert-context"
          src="https://tickets.interpark.com/contents/_next/static/media/ranking_badge_purple.ea646533.svg"
          alt="1"
        />
        <span className="concert-number">{concertInfo.id}</span>
      </div>
      <div className="concert-center-box">
        <div className="concert-context">
          <img src={concertInfo.image} alt="사진" />
        </div>
      </div>
      <div className="concert-right-box">
        <div className="concert-title">{concertInfo.title}</div>
        <div className="concert-location">{concertInfo.location}</div>
        <div className="concert-date">{concertInfo.date}</div>
      </div>
    </div>
  );
}

export default ConcertItem;
