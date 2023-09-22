import React from 'react';
import './BackNavBar.scss';
import { Toolbar } from '@mui/material';
import BackIcon from 'assets/BackIcon.svg';
import useMovePage from 'hooks/useMovePage';

function BackNavBar() {
  const { goBack } = useMovePage();
  //   const moveBack = () => {
  //     goBack();
  //   };
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20px',
      }}
    >
      <div onClick={() => goBack()} aria-hidden>
        <img src={BackIcon} alt="<" />
      </div>
    </Toolbar>
  );
}

export default BackNavBar;
