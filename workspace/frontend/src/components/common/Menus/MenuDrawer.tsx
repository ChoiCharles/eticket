import React from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import { useRecoilState } from 'recoil';
import { drawerState } from 'atoms/NavState';
import TopNav from './HamburgerItems/TopNav';
import MyMenu from './HamburgerItems/MyMenu';
import MainMenu from './HamburgerItems/MainMenu';
import AuthMenu from './HamburgerItems/AuthMenu';

const MenuDrawer = () => {
  const [open, setOpen] = useRecoilState(drawerState);

  const menus = [TopNav, MyMenu, MainMenu, AuthMenu];

  const handleToggleDrawer = () => {
    setOpen(prev => !prev);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '100%',
        },
      }}
    >
      {menus.map((Menu, index) => (
        <Box key={String(index)}>
          <Menu handleToggleDrawer={handleToggleDrawer} />
          {index === 0 && <Divider />}
          {index > 0 && index < menus.length - 1 && (
            <Divider sx={{ borderBottomWidth: 15 }} />
          )}
        </Box>
      ))}
    </Drawer>
  );
};

export default MenuDrawer;
