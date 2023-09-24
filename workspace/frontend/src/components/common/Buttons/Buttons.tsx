import React from 'react';
import MetaMask from 'assets/MetaMask.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import { hamburgerState, searchState } from 'atoms/NavState';
import useAccount from 'hooks/useAccount';

import './Buttons.scss';

const Buttons = () => {
  const { loginMetaMask } = useAccount();

  const [, setSearch] = useRecoilState(searchState);
  const [, setHamburger] = useRecoilState(hamburgerState);

  return (
    <div>
      <IconButton onClick={() => loginMetaMask()}>
        <img id="metamask" src={MetaMask} alt="metamask" />
      </IconButton>
      <IconButton onClick={() => setSearch(true)}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={() => setHamburger(true)}>
        <MenuIcon />
      </IconButton>
    </div>
  );
};

export default Buttons;
