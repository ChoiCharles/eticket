import React from 'react';
import MuiCarousel from 'react-material-ui-carousel';
import { Paper, Button, Typography } from '@mui/material';

import './Carousel.scss';

type Item = {
  name: string;
  description: string;
  color: string;
};

interface ProjectProps {
  item: Item;
}

function Project({ item }: ProjectProps) {
  return (
    <Paper
      className="Project"
      style={{
        backgroundColor: item.color,
      }}
      elevation={10}
    >
      <Typography variant="h5">{item.name}</Typography>
      <br />
      <Typography>{item.description}</Typography>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

const items: Item[] = [
  {
    name: 'Lear Music Reader',
    description: 'A PDF Reader specially designed for musicians.',
    color: '#64ACC8',
  },
  {
    name: 'Hash Code 2019',
    description:
      'My Solution on the 2019 Hash Code by Google Slideshow problem.',
    color: '#7D85B1',
  },
  {
    name: 'Terrio',
    description: 'A exciting mobile game game made in the Unity Engine.',
    color: '#CE7E78',
  },
  {
    name: 'React Carousel',
    description: 'A Generic carousel UI component for React using material ui.',
    color: '#C9A27E',
  },
];

const Carousel = () => {
  return (
    <div>
      <MuiCarousel
        className="carousel"
        autoPlay
        indicators={false}
        swipe
        cycleNavigation
        navButtonsAlwaysInvisible
        fullHeightHover
      >
        {items.map(item => {
          return <Project item={item} key={item.name} />;
        })}
      </MuiCarousel>
    </div>
  );
};

export default Carousel;
