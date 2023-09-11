import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from '@mui/material';
import SearchInput from '../SearchInput/SearchInput.tsx';
import LogoToHome from '../LogoToHome/LogoToHome.tsx';

const TopNavBar = () => {
  const settings = ['회원 정보 수정', '내 지갑', '구매 내역', '로그아웃'];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLogin, setIsLogin] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickLogin = () => {
    setIsLogin(true);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
      }}
      elevation={0}
    >
      <Container>
        <Toolbar disableGutters>
          <LogoToHome
            variant="h6"
            display={{ xs: 'none', sm: 'flex' }}
            name="ETICKET"
            fontSize="26px"
          />
          <LogoToHome
            variant="body2"
            display={{ xs: 'flex', sm: 'none' }}
            name="ETICKET"
            fontSize="18px"
          />

          <SearchInput />
          {isLogin ? (
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt="오영재" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(setting => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              onClick={handleClickLogin}
              sx={{
                color: 'black',
                display: { xs: 'none', sm: 'flex' },
                opacity: 0.8,
                ml: '15px',
              }}
              size="large"
            >
              로그인
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavBar;
