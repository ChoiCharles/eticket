import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import useMovePage from 'hooks/useMovePage';

type Item = {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
};

interface Props {
  item: Item;
}

const UpcomingListItem = ({ item }: Props) => {
  const { movePage } = useMovePage();

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        my: 1,
      }}
      variant="outlined"
    >
      <CardActionArea onClick={() => movePage('/', null)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
          <CardContent sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Typography variant="body1" noWrap>
              {item.title}
            </Typography>
          </CardContent>
          <CardMedia
            sx={{ width: '80px', height: '100px', mr: 1.5 }}
            component="img"
            image={item.image}
            alt="img"
          />
        </Box>
        <Divider />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">티켓 오픈</Typography>
          <Typography variant="body2">{item.date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UpcomingListItem;
