import React from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import TopFiveConcertList from 'components/home/TopFiveConcertList/TopFiveConcertList';
import ConcertRankingList from 'components/home/ConcertRankingList/ConcertRankingList';
import NftGalleryList from 'components/home/NftGalleryList/NftGalleryList';
import ComingSoonList from 'components/home/ComingSoonList/ComingSoonList';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <TopFiveConcertList />
      <ConcertRankingList />
      <NftGalleryList />
      <ComingSoonList />
    </Box>
  );
};

export default Home;
