import React from 'react';
import { IconButton } from '@mui/material';
import iconImg from 'assets/ETICKET.svg';

const Logo = () => {
  return (
    <div>
      <IconButton>
        <img src={iconImg} alt="logo" />
      </IconButton>
    </div>
  );
};

export default Logo;
