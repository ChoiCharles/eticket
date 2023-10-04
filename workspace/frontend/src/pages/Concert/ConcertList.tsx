import ConcertItem from 'components/concertList/ConcertItem/ConcertItem';
import React, { useEffect } from 'react';
import dummyConcert from 'dummys.ts';
// import NavBar from 'components/common/NavBar/NavBar';
import BackNavBar from 'components/common/BackNavBar/BackNavBar';
import instance from 'apis/utils/instance';

function ConcertList() {
  const dateData = new Date();
  useEffect(() => {
    Promise.all([instance.get('/api/performances/hot')])
      .then(([hotRes]) => {
        console.log('Hot Performances:', hotRes);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <div>
      <BackNavBar title="콘서트 랭킹" />
      <div style={{ padding: '20px' }}>
        {/* 날짜 나타내는 코드 */}
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
