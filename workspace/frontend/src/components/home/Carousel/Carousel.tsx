import React from 'react';
import MuiCarousel from 'react-material-ui-carousel';
import CarouselItem from './CarouselItem';
import items from '../../../dummys';

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
        return <CarouselItem item={item} key={item.id} />;
      })}
    </MuiCarousel>
  );
};

export default Carousel;
