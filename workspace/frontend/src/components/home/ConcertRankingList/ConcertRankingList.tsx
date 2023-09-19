import React from 'react';
import SubCarousel from 'components/common/Carousel/Carousel';
import { Button, Typography } from '@mui/material';

import './ConcertRankingList.scss';

const ConcertRankingList = () => {
  return (
    <div className="concert-ranking">
      <Typography variant="h6">공연 랭킹</Typography>
      <SubCarousel />
      <Button fullWidth variant="contained">
        전체 보기
      </Button>
    </div>
  );
};

export default ConcertRankingList;
