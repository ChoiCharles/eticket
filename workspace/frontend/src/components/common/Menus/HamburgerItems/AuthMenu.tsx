import React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import useMovePage from 'hooks/useMovePage';

interface Props {
  handleToggleDrawer: () => void;
}

const AuthMenu = ({ handleToggleDrawer }: Props) => {
  const menus = [
    { name: '로그인', url: '/login' },
    { name: '회원가입', url: '/signup' },
  ];

  const { movePage } = useMovePage();

  const handleMovePage = (url: string) => {
    handleToggleDrawer();
    movePage(url, null);
  };

  return (
    <List disablePadding>
      {menus.map(menu => (
        <ListItem key={menu.name}>
          <ListItemButton onClick={() => handleMovePage(menu.url)}>
            <ListItemText primary={menu.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default AuthMenu;
