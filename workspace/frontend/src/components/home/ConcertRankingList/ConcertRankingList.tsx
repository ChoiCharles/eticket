import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import RowStack from '../RowStack/RowStack';

const ConcertRankingList = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6">공연 랭킹</Typography>
      <RowStack />
      <Button sx={{ color: 'white' }} fullWidth variant="contained">
        전체 보기
      </Button>
    </Box>
  );
};

export default ConcertRankingList;
