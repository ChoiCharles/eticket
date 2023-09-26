import React from 'react';
import MuiCarousel from 'react-material-ui-carousel';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import items from '../../../dummys';

type Item = {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
};

interface PerformanceProps {
  item: Item;
}

function Performance({ item }: PerformanceProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          // height="140"
          image={item.image}
          alt="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2">{item.location}</Typography>
          <Typography variant="body2">{item.date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const Carousel = () => {
  return (
    <MuiCarousel
      autoPlay
      indicators={false}
      swipe
      cycleNavigation
      navButtonsAlwaysInvisible
      fullHeightHover
    >
      {items.map(item => {
        return <Performance item={item} key={item.id} />;
      })}
    </MuiCarousel>
  );
};

export default Carousel;
