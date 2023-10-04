import React, { useEffect, useState } from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import TopFiveConcertList from 'components/home/TopFiveConcertList/TopFiveConcertList';
import RowStack from 'components/home/RowStack/RowStack';
import { Box, Divider } from '@mui/material';
import instance from 'apis/utils/instance';

const Home = () => {
  const [hot, setHot] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    Promise.all([
      instance.get('/api/performances/hot'),
      instance.get('/api/performances/upcoming'),
    ])
      .then(([hotRes, upcomingRes]) => {
        setHot(hotRes.data.hotPerformanceList);
        setUpcoming(upcomingRes.data.upcomingPerformanceList);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <TopFiveConcertList />
      <RowStack title="공연 랭킹" items={hot} url="/concert" />
      <Divider sx={{ borderBottomWidth: 10, borderColor: '#F5F5F9' }} />
      <RowStack title="💥예매 임박💥" items={upcoming} url="/upcoming" />
    </Box>
  );
};

export default Home;
