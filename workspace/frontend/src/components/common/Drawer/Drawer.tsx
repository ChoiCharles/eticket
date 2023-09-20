import React from 'react';
import { Box, Divider } from '@mui/material';
import { useRecoilState } from 'recoil';
import drawerState from 'atoms/Drawer';
import TopNav from './DrawerItems/TopNav';
import MyMenu from './DrawerItems/MyMenu';
import MainMenu from './DrawerItems/MainMenu';
import AuthMenu from './DrawerItems/AuthMenu';

const Drawer = () => {
  const [, setOpen] = useRecoilState(drawerState);

  const menus = [TopNav, MyMenu, MainMenu, AuthMenu];

  const handleToggleDrawer = () => {
    setOpen(prev => !prev);
  };

  return (
    <Box>
      {menus.map((Menu, index) => (
        <div key={String(index)}>
          <Menu handleToggleDrawer={handleToggleDrawer} />
          {index === 0 && <Divider />}
          {index > 0 && index < menus.length - 1 && (
            <Divider sx={{ borderBottomWidth: 10 }} />
          )}
        </div>
      ))}
    </Box>
  );
};

export default Drawer;
