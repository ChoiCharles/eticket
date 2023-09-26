import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Divider, List } from '@mui/material';

interface Props {
  keyword: string;
}

const SearchResult = ({ keyword }: Props) => {
  const [results, setResults] = useState<number[]>([]);
  useEffect(() => {
    setResults([1]);
    console.log('call api');
  }, [results]);
  return (
    <Box>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 3,
        }}
        elevation={0}
      >
        <Typography variant="h6">
          <b>{`'${keyword}'`}</b> 검색결과
        </Typography>
      </Paper>
      <Divider sx={{ backgroundColor: '#000000', borderBottomWidth: 2 }} />
      <List
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 3,
        }}
        disablePadding
      >
        {results.length > 0 ? (
          results.map(() => (
            <Typography variant="body1">검색결과가 있습니다.</Typography>
          ))
        ) : (
          <Typography variant="body1">검색결과가 없습니다.</Typography>
        )}
      </List>
    </Box>
  );
};

export default SearchResult;
