import React, { useState } from 'react';
import './MainCarousel.scss';

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=300&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=300&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&h=250',
  },
];

const MainCarousel = () => {
  const [curConcert, setCurConcert] = useState(0);
  const [carouselTransition, setCarouselTransition] = useState(
    'transform 500ms ease-in-out',
  );

  const makeNewConcerts = concerts => {
    const concertStart = concerts[0];
    const concertEnd = concerts[concerts.length - 1];
    const modifiedArray = [concertEnd, ...concerts, concertStart];
    return modifiedArray;
  };

  const moveToNthConcert = (n: number) => {
    setTimeout(() => {
      setCarouselTransition('');
      setCurConcert(n);
    }, 500);
  };

  const slideNextConcert = () => {
    const sliderLength = images.length;
    const newCur = curConcert + 1;
    setCurConcert(newCur);

    if (newCur === sliderLength + 1) {
      moveToNthConcert(1);
    }

    setCarouselTransition('transform 500ms ease-in-out');
  };

  const slidePrevConcert = () => {
    const sliderLength = images.length;
    const newCur = curConcert - 1;
    setCurConcert(newCur);

    if (newCur === 0) {
      moveToNthConcert(sliderLength);
    }

    setCarouselTransition('transform 500ms ease-in-out');
  };

  return (
    <div
      className="main-carousel"
      style={{
        transform: `translateX(-${curConcert * 100}%)`,
        transition: carouselTransition,
      }}
    >
      {images.map(img => {
        return (
          <img
            className="main-carousel__concert"
            key={img.label}
            src={img.imgPath}
            alt="X"
          />
        );
      })}
    </div>
  );
};

export default MainCarousel;
