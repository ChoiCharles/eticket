import React from 'react';
import Carousel from 'components/common/Carousel/Carousel';
import { Box, Button, Typography } from '@mui/material';

const ComingSoonList = () => {
  return (
    <Box>
      <Typography variant="h6">💥예매 임박💥</Typography>
      <Carousel />
      <Button fullWidth variant="contained">
        전체 보기
      </Button>
    </Box>
  );
};

export default ComingSoonList;
