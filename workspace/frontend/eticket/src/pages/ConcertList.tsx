import ConcertItem from 'components/concert-list/concert-item/ConcertItem.tsx';
import React from 'react';
import dummyConcert from 'dummys.ts';

function ConcertList() {
  return (
    <div>
      {dummyConcert.map(value => (
        <ConcertItem concertInfo={value} />
      ))}
    </div>
  );
}

export default ConcertList;
