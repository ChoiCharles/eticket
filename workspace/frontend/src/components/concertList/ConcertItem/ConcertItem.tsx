import React from 'react';
import './ConcertItem.scss';
import useMovePage from 'hooks/useMovePage.ts';

// interface ConcertListItem {
//   id: number;
//   image: string;
//   title: string;
//   location: string;
//   date: string;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ConcertItem({ concertInfo }: { concertInfo: any }) {
  console.log(concertInfo);

  const { movePage } = useMovePage();

  const handleConcertClick = () => {
    movePage(`/concert/${concertInfo.id.value}`, null);
  };

  return (
    <div className="concert-list-main-box">
      <div
        className="concert-item-outer-box"
        onClick={handleConcertClick}
        aria-hidden
      >
        <div className="concert-left-box">
          <img
            className="rank-frame concert-context"
            src="https://tickets.interpark.com/contents/_next/static/media/ranking_badge_purple.ea646533.svg"
            alt="1"
          />
          <span className="concert-number">{concertInfo.id.value}</span>
        </div>
        <div className="concert-center-box">
          <div className="concert-context">
            <img
              src={concertInfo.posterImagePath}
              alt="사진"
              style={{ width: '90px', height: '120px' }}
            />
          </div>
        </div>
        <div className="concert-right-box">
          {/* <div className="concert-tag">단독 공연</div> */}
          <div className="concert-title">{concertInfo.title}</div>
          {/* <div className="concert-location-text">{concertInfo.location}</div> */}
          <div className="concert-date">
            {concertInfo.ticketingOpenDateTime}
          </div>
        </div>
      </div>
      <div className="base2-line" style={{ marginTop: '20px' }} />
    </div>
  );
}

export default ConcertItem;
