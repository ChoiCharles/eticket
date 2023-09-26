import React from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import TopFiveConcertList from 'components/home/TopFiveConcertList/TopFiveConcertList';
import RowStack from 'components/home/RowStack/RowStack';
import { Box, Divider } from '@mui/material';
import items from '../../dummys';

const Home = () => {
  const menus = [
    { title: '공연 랭킹', items, url: '/concert' },
    { title: 'NFT 전시장', items, url: '/gallery' },
    { title: '💥예매 임박💥', items, url: '/soon' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <TopFiveConcertList />
      {menus.map((menu, index) => {
        return (
          <div key={String(index)}>
            {index > 0 && (
              <Divider
                sx={{ my: 3, borderBottomWidth: 10, borderColor: '#F5F5F9' }}
              />
            )}
            <RowStack title={menu.title} items={menu.items} url={menu.url} />
          </div>
        );
      })}
    </Box>
  );
};

export default Home;
