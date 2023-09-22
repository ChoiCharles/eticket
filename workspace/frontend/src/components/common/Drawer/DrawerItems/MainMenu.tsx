import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useMovePage from 'hooks/useMovePage';

interface Props {
  handleToggleDrawer: () => void;
}

const MainMenu = ({ handleToggleDrawer }: Props) => {
  const menus = [
    { name: '공연 랭킹', url: '/concert' },
    { name: 'NFT 전시장', url: '/gallery' },
    { name: '💥예매 임박💥', url: '/soon' },
  ];

  const { movePage } = useMovePage();

  const handleMovePage = (url: string) => {
    handleToggleDrawer();
    movePage(url, null);
  };

  return (
    <List>
      {menus.map(menu => (
        <ListItem key={menu.name}>
          <ListItemButton onClick={() => handleMovePage(menu.url)}>
            <ListItemText
              primary={menu.name}
              primaryTypographyProps={{
                fontSize: 24,
                fontWeight: 'medium',
              }}
            />
            <ListItemIcon>
              <KeyboardArrowRightIcon fontSize="large" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MainMenu;
