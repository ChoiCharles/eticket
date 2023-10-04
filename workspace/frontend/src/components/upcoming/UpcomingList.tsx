import React from 'react';
import { Box } from '@mui/material';
import items from 'dummys';
import UpcomingListItem from './UpcomingListItem';

const UpcomingList = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', px: 1 }}>
      {items.map(item => {
        return <UpcomingListItem item={item} />;
      })}
    </Box>
  );
};

export default UpcomingList;
