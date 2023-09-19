import React, { useState } from 'react';
import Buttons from 'components/common/Buttons/Buttons';
import Logo from 'components/common/Logo/Logo';
import { Drawer } from '@mui/material';

import './NavBar.scss';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer: () => void = () => {
    setIsOpen(true);
  };

  const handleCloseDrawer: () => void = () => {
    setIsOpen(false);
  };
  return (
    <div className="nav-bar">
      <Logo />
      <Buttons handleOpenDrawer={handleOpenDrawer} />
      <Drawer anchor="right" open={isOpen} onClick={handleCloseDrawer} />
    </div>
  );
};

export default NavBar;
