import React from 'react';
import { Card, CardActionArea, CardMedia, Typography } from '@mui/material';

type Item = {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
  index: number;
  total: number;
};

interface Props {
  item: Item;
}

const CarouselItem = ({ item }: Props) => {
  return (
    <Card
      sx={{
        position: 'relative',

        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          width: '100%',
          height: '34%',
          bottom: 0,
          zIndex: 1,
          background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          py: 0.5,
          px: 1,
          right: 10,
          bottom: 20,
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          borderRadius: 5,
        }}
      >{`${item.index + 1} / ${item.total}`}</Typography>
      <CardActionArea>
        <CardMedia
          sx={{ borderRadius: 1 }}
          component="img"
          image={item.image}
          alt="img"
        />
      </CardActionArea>
    </Card>
  );
};

export default CarouselItem;
