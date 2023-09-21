import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  keyword: string;
}

const SearchResult = ({ keyword }: Props) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography variant="h6">
        <b>{`'${keyword}'`}</b>검색결과
      </Typography>
    </Box>
  );
};

export default SearchResult;
