import React from 'react';
import { Hidden } from '@mui/material';
import TopNavBar from '../../components/common/TopNavBar/TopNavBar.tsx';
import BottomNavBar from '../../components/common/BottomNavBar/BottomNavBar.tsx';

const Home = () => {
  return (
    <>
      <TopNavBar />
      {/* <HomeCarousel />
      <HighRankingList />
      <NftRankingList /> */}
      <Hidden smUp>
        <BottomNavBar />
      </Hidden>
    </>
  );
};

export default Home;
