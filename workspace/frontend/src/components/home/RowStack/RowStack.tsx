import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import useMovePage from 'hooks/useMovePage';
import PerformanceItem from '../PerformanceItem/PerformanceItem';

interface Props {
  title: string;
  items: {
    id: number;
    image: string;
    title: string;
    location: string;
    date: string;
  }[];
  url: string;
}

const RowStack = ({ title, items, url }: Props) => {
  const { movePage } = useMovePage();

  return (
    <Box sx={{ px: 1.5 }}>
      <Typography sx={{ mb: 2 }} variant="h5">
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Stack direction="row" spacing={2}>
          {items.map(item => {
            return <PerformanceItem item={item} key={item.id} />;
          })}
        </Stack>
      </Box>
      <Button
        sx={{ mt: 2, color: '#A3A5AD' }}
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => movePage(url, null)}
        disableElevation
        size="small"
      >
        {title} 더보기
      </Button>
    </Box>
  );
};

export default RowStack;
