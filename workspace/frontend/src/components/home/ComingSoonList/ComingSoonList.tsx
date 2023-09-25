import React from 'react';
import Carousel from 'components/common/Carousel/Carousel';
import { Button, Typography } from '@mui/material';

import './ComingSoonList.scss';

const ComingSoonList = () => {
  return (
    <div className="coming-soon">
      <Typography variant="h6">💥예매 임박💥</Typography>
      <Carousel />
      <Button fullWidth variant="contained">
        전체 보기
      </Button>
    </div>
  );
};

export default ComingSoonList;
