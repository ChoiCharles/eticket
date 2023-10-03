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
      {items.map((item, index) => {
        const orderedItem = { ...item, index, total: items.length };
        return <CarouselItem key={item.id} item={orderedItem} />;
      })}
    </MuiCarousel>
  );
};

export default Carousel;
