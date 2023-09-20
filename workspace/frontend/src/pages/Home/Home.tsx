import React from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import TopFiveConcertList from 'components/home/TopFiveConcertList/TopFiveConcertList';
import ConcertRankingList from 'components/home/ConcertRankingList/ConcertRankingList';
import NftGalleryList from 'components/home/NftGalleryList/NftGalleryList';
import ComingSoonList from 'components/home/ComingSoonList/ComingSoonList';
import Drawer from 'components/common/Drawer/Drawer';
import Search from 'components/common/Search/Search';
import { useRecoilValue } from 'recoil';
import { drawerState, searchState } from 'atoms/NavState';

import './Home.scss';

const Home = () => {
  const open = useRecoilValue(drawerState);
  const search = useRecoilValue(searchState);

  let component = null;

  if (open) {
    component = <Drawer />;
  } else if (search) {
    component = <Search />;
  } else {
    component = (
      <>
        <NavBar />
        <TopFiveConcertList />
        <ConcertRankingList />
        <NftGalleryList />
        <ComingSoonList />
      </>
    );
  }

  return <div className="container">{component}</div>;
};

export default Home;
