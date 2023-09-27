import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

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
          height: '64%',
          bottom: 0,
          zIndex: 1,
          background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          sx={{ borderRadius: 1 }}
          component="img"
          image={item.image}
          alt="img"
        />
        <CardContent
          sx={{
            position: 'absolute',
            zIndex: 2,
            bottom: 0,
            width: '100%',
            color: 'white',
          }}
        >
          <Typography variant="body1" noWrap>
            <b>{item.title}</b>
          </Typography>
          <Typography variant="body2">{item.date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CarouselItem;
