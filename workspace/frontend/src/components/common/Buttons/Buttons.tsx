import React from 'react';
import MetaMask from 'assets/MetaMask.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import './Buttons.scss';

const Buttons = () => {
  return (
    <div>
      <IconButton>
        <img id="metamask" src={MetaMask} alt="metamask" />
      </IconButton>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <IconButton>
        <MenuIcon />
      </IconButton>
    </div>
  );
};

export default Buttons;
