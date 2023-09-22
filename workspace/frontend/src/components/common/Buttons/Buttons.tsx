import React from 'react';
import MetaMask from 'assets/MetaMask.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import { drawerState, searchState } from 'atoms/NavState';

import useAccount from 'hooks/useAccount';

import './Buttons.scss';

const Buttons = () => {
  const { loginMetaMask } = useAccount();

  const [, setOpen] = useRecoilState(drawerState);
  const [, setSearch] = useRecoilState(searchState);

  const handleToggleSearch = () => {
    setSearch(prev => !prev);
  };

  const handleToggleDrawer = () => {
    setOpen(prev => !prev);
  };

  return (
    <div>
      <IconButton onClick={() => loginMetaMask()}>
        <img id="metamask" src={MetaMask} alt="metamask" />
      </IconButton>
      <IconButton onClick={handleToggleSearch}>
        <SearchIcon fontSize="large" />
      </IconButton>
      <IconButton onClick={handleToggleDrawer}>
        <MenuIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Buttons;
