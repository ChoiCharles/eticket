import ConcertItem from 'components/concertList/ConcertItem/ConcertItem';
import React from 'react';
import dummyConcert from 'dummys.ts';
import NavBar from 'components/common/NavBar/NavBar';

function ConcertList() {
  const dateData = new Date();

  return (
    <div>
      <NavBar />
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
