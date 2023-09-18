import ConcertItem from 'components/concert-list/concert-item/ConcertItem.tsx';
import React from 'react';
import dummyConcert from 'dummys.ts';
import TopNavBar from 'components/common/TopNavBar/TopNavBar.tsx';

function ConcertList() {
  const dateData = new Date();

  return (
    <div>
      <TopNavBar />
      <div>
        {dateData.toLocaleDateString('ko-KR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      {dummyConcert.map(value => (
        <ConcertItem concertInfo={value} key={value.title} />
      ))}
    </div>
  );
}

export default ConcertList;
