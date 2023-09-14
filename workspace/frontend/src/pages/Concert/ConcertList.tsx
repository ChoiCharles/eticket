import ConcertItem from 'components/concert-list/concert-item/ConcertItem.tsx';
import React from 'react';
import dummyConcert from 'dummys.ts';
import TopNavBar from 'components/common/TopNavBar/TopNavBar.tsx';

function ConcertList() {
  return (
    <div>
      <TopNavBar />
      {dummyConcert.map(value => (
        <ConcertItem concertInfo={value} />
      ))}
    </div>
  );
}

export default ConcertList;
