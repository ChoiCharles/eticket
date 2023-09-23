import React from 'react';
import { Box, Divider } from '@mui/material';
import TopNav from './HamburgerItems/TopNav';
import MyMenu from './HamburgerItems/MyMenu';
import MainMenu from './HamburgerItems/MainMenu';
import AuthMenu from './HamburgerItems/AuthMenu';

interface Props {
  handleToggleDrawer: () => void;
}

const Hamburger = ({ handleToggleDrawer }: Props) => {
  const menus = [TopNav, MyMenu, MainMenu, AuthMenu];

  return (
    <div>
      {menus.map((Menu, index) => (
        <Box key={String(index)}>
          <Menu handleToggleDrawer={handleToggleDrawer} />
          {index === 0 && <Divider />}
          {index > 0 && index < menus.length - 1 && (
            <Divider sx={{ borderBottomWidth: 15 }} />
          )}
        </Box>
      ))}
    </div>
  );
};

export default Hamburger;
