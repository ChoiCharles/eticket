import React from 'react';
import MetaMask from 'assets/MetaMask.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import hamburgerState from 'atoms/NavState';
import useAccount from 'hooks/useAccount';

import './Buttons.scss';
import useMovePage from 'hooks/useMovePage';

const Buttons = () => {
  const { loginMetaMask } = useAccount();
  const { movePage } = useMovePage();
  const [, setHamburger] = useRecoilState(hamburgerState);

  return (
    <div>
      <IconButton onClick={() => loginMetaMask()}>
        <img id="metamask" src={MetaMask} alt="metamask" />
      </IconButton>
      <IconButton onClick={() => movePage('/search', null)}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={() => setHamburger(true)}>
        <MenuIcon />
      </IconButton>
    </div>
  );
};

export default Buttons;
