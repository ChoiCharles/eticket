import ConcertItem from 'components/concertList/ConcertItem/ConcertItem';
import React, { useEffect, useState } from 'react';
// import dummyConcert from 'dummys.ts';
// import NavBar from 'components/common/NavBar/NavBar';
import BackNavBar from 'components/common/BackNavBar/BackNavBar';
import instance from 'apis/utils/instance';

function ConcertList() {
  const dateData = new Date();
  const [data, setData] = useState([]);
  // const fetchData = async () => {
  //   try {
  //     const response = await instance.get('/api/performances/hot');
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(fetchData);

  useEffect(() => {
    Promise.all([instance.get('/api/performances/hot')])
      .then(([hotRes]) => {
        console.log('Hot Performances:', hotRes);
        const reList = hotRes.data.hotPerformanceList.reverse();
        setData(reList);
        // const concertListData = hotRes;
      })
      .catch(error => console.error('Error:', error));
  }, []);
  console.log(data);

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
      {data.map(value => (
        <ConcertItem concertInfo={value} key={value} />
      ))}
    </div>
  );
}

export default ConcertList;
