import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const ComingSoonList = () => {
  return (
    <Box sx={{ alignItems: 'start' }}>
      <Typography variant="h6">💥예매 임박💥</Typography>
      <Button fullWidth variant="contained">
        전체 보기
      </Button>
    </Box>
  );
};

export default ComingSoonList;
