import React from 'react';
import Buttons from 'components/common/Buttons/Buttons';
import Logo from 'components/common/Logo/Logo';
import { Toolbar } from '@mui/material';

const NavBar = () => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Logo />
      <Buttons />
    </Toolbar>
  );
};

export default NavBar;
