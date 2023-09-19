import React from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import TopFiveConcertList from 'components/home/TopFiveConcertList/TopFiveConcertList';
import ConcertRankingList from 'components/home/ConcertRankingList/ConcertRankingList';
import './Home.scss';

const Home = () => {
  return (
    <div className="container">
      <NavBar />
      <TopFiveConcertList />
      <ConcertRankingList />
      {/* <NftRankingList /> */}
    </div>
  );
};

export default Home;
