import React from 'react';
import { Drawer } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { searchState, hamburgerState } from 'atoms/NavState';
import Hamburger from './Hamburger';
import Search from './Search';

const MenuDrawer = () => {
  const hamburger = useRecoilValue(hamburgerState);
  const search = useRecoilValue(searchState);

  return (
    <Drawer
      anchor="right"
      open={hamburger || search}
      PaperProps={{
        sx: {
          width: '100%',
        },
      }}
    >
      {hamburger && <Hamburger />}
      {search && <Search />}
    </Drawer>
  );
};

export default MenuDrawer;
