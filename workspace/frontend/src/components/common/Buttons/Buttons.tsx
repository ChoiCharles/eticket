import React from 'react';
import MetaMask from 'assets/MetaMask.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import drawerState from 'atoms/Drawer';

import './Buttons.scss';

const Buttons = () => {
  const [, setOpen] = useRecoilState(drawerState);

  const handleToggleDrawer = () => {
    setOpen(prev => !prev);
  };

  return (
    <div>
      <IconButton>
        <img id="metamask" src={MetaMask} alt="metamask" />
      </IconButton>
      <IconButton>
        <SearchIcon fontSize="large" />
      </IconButton>
      <IconButton onClick={handleToggleDrawer}>
        <MenuIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Buttons;
