import React from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import TopFiveConcertList from 'components/home/TopFiveConcertList/TopFiveConcertList';
import ConcertRankingList from 'components/home/ConcertRankingList/ConcertRankingList';
import NftGalleryList from 'components/home/NftGalleryList/NftGalleryList';
import ComingSoonList from 'components/home/ComingSoonList/ComingSoonList';
import { Drawer } from '@mui/material';

import './Home.scss';

const Home = () => {
  const isOpen = true;
  return (
    <div className="container">
      <NavBar />
      <TopFiveConcertList />
      <ConcertRankingList />
      <NftGalleryList />
      <ComingSoonList />
      <Drawer anchor="right" open={isOpen} />
    </div>
  );
};

export default Home;
