import React from 'react';
import MuiCarousel from 'react-material-ui-carousel';
import PerformanceItem from '../PerformanceItem/PerformanceItem';
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
        return <PerformanceItem item={item} key={item.id} />;
      })}
    </MuiCarousel>
  );
};

export default Carousel;
