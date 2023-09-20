import React from 'react';
import MetaMask from 'assets/MetaMask.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

import './Buttons.scss';

interface Props {
  handleOpenDrawer: () => void;
}

const Buttons = ({ handleOpenDrawer }: Props) => {
  const handleOpenSearch = () => {
    console.log('open Search');
  };

  return (
    <div>
      <IconButton>
        <img id="metamask" src={MetaMask} alt="metamask" />
      </IconButton>
      <IconButton onClick={handleOpenSearch}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={handleOpenDrawer}>
        <MenuIcon />
      </IconButton>
    </div>
  );
};

export default Buttons;
