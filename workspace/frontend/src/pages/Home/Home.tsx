import React from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import TopFiveConcertList from 'components/home/TopFiveConcertList/TopFiveConcertList';
import ConcertRankingList from 'components/home/ConcertRankingList/ConcertRankingList';
import NftGalleryList from 'components/home/NftGalleryList/NftGalleryList';
import ComingSoonList from 'components/home/ComingSoonList/ComingSoonList';
import Drawer from 'components/common/Drawer/Drawer';
import { useRecoilValue } from 'recoil';
import drawerState from 'atoms/Drawer';

import './Home.scss';

const Home = () => {
  const open = useRecoilValue(drawerState);

  return (
    <div className="container">
      {open ? (
        <Drawer />
      ) : (
        <>
          <NavBar />
          <TopFiveConcertList />
          <ConcertRankingList />
          <NftGalleryList />
          <ComingSoonList />
        </>
      )}
    </div>
  );
};

export default Home;
