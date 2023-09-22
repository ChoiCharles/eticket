import React from 'react';
import { Drawer } from '@mui/material';
import { useRecoilState } from 'recoil';
import { searchState, drawerState } from 'atoms/NavState';
import Hamburger from './Hamburger';
import Search from './Search';

const MenuDrawer = () => {
  const [open, setOpen] = useRecoilState(drawerState);
  const [search, setSearch] = useRecoilState(searchState);

  const handleToggleDrawer = () => {
    setOpen(prev => !prev);
  };

  const handleToggleSearch = () => {
    setSearch(prev => !prev);
  };

  return (
    <Drawer
      anchor="right"
      open={open || search}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '100%',
        },
      }}
    >
      {open && <Hamburger handleToggleDrawer={handleToggleDrawer} />}
      {search && <Search handleToggleSearch={handleToggleSearch} />}
    </Drawer>
  );
};

export default MenuDrawer;
