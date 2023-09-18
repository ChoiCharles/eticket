import React, { TouchEventHandler, useEffect, useRef, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './MainCarousel.scss';

interface Props {
  concerts: { label: string; imgPath: string }[];
}

let touchStartX: number;
let touchEndX: number;

const MainCarousel = ({ concerts }: Props) => {
  const [curIndex, setCurIndex] = useState(1);
  const [, setCurConcerts] = useState<object[]>([]);

  const carouselRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (concerts.length !== 0) {
      const startConcert = concerts[0];
      const endConcert = concerts[concerts.length - 1];
      const newConcerts = [endConcert, ...concerts, startConcert];

      setCurConcerts(newConcerts);
    }
  }, [concerts]);

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${curIndex * 100}%)`;
    }
  }, [curIndex]);

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setCurIndex(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = '';
      }
    }, 500);
  };

  const handleSwipe = (direction: number) => {
    console.log(direction);
    const newIndex = curIndex + direction;

    if (newIndex === concerts.length + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(concerts.length);
    }

    setCurIndex(prev => prev + direction);

    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = event => {
    touchStartX = event.nativeEvent.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = event => {
    const curTouchX = event.nativeEvent.changedTouches[0].clientX;

    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(calc(-${
        curIndex * 100
      }% - ${(touchStartX - curTouchX) * 2 || 0}px))`;
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = event => {
    touchEndX = event.nativeEvent.changedTouches[0].clientX;

    if (touchStartX >= touchEndX) {
      handleSwipe(1);
    } else {
      handleSwipe(-1);
    }
  };

  return (
    <div className="container">
      <div
        className="carouselWrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className="swipeLeft"
          onClick={() => handleSwipe(-1)}
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          type="button"
          className="swipeRight"
          onClick={() => handleSwipe(1)}
        >
          <KeyboardArrowRightIcon />
        </button>
        <ul className="carousel" ref={carouselRef}>
          {concerts?.map((concert, idx) => {
            const key = `${concert.label}-${idx}`;

            return (
              <li key={key} className="carouselItem">
                <img src={concert.imgPath} alt="carousel-img" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainCarousel;
