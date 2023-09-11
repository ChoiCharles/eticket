import React from 'react';
import './ConsertItem.scss';

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
      <div className="concert-right-box">
        <div className="concert-context concert-number">{concertInfo.id}</div>
        <div className="concert-context">{concertInfo.image}</div>
        <div className="concert-context">{concertInfo.title}</div>
      </div>
      <div className="concert-left-box">
        <div className="concert-context">{concertInfo.location}</div>
        <div className="concert-context">{concertInfo.date}</div>
      </div>
    </div>
  );
}

export default ConcertItem;
