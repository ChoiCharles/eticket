import React from 'react';
import MetaMask from 'assets/MetaMask.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import sideBarState from 'atoms/Drawer';

import './Buttons.scss';

const Buttons = () => {
  const [, setIsOpen] = useRecoilState(sideBarState);

  const handleToggleSideBar = () => {
    setIsOpen(prev => !prev);
  };

  const handleSearch = () => {
    console.log('open Search');
  };

  return (
    <div>
      <IconButton>
        <img id="metamask" src={MetaMask} alt="metamask" />
      </IconButton>
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={handleToggleSideBar}>
        <MenuIcon />
      </IconButton>
    </div>
  );
};

export default Buttons;
