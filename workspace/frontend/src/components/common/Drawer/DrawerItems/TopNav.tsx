import React from 'react';
import { Button, IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMovePage from 'hooks/useMovePage';

interface Props {
  handleToggleDrawer: () => void;
}

const TopNav = ({ handleToggleDrawer }: Props) => {
  const movePage = useMovePage();

  const handleMovePage = () => {
    handleToggleDrawer();
    movePage('/login', null);
  };

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        size="large"
        sx={{ fontSize: '20px', textDecoration: 'underline', color: 'black' }}
        onClick={handleMovePage}
      >
        로그인을 해주세요.
      </Button>
      <IconButton onClick={handleToggleDrawer}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Toolbar>
  );
};

export default TopNav;
