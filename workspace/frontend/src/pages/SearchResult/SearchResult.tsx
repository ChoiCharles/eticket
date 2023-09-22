import React from 'react';
import { Box, Typography } from '@mui/material';
// import SearchInput from 'components/common/Menus/SearchItems/SearchInput';

const SearchResult = () => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {/* <SearchInput /> */}
      <Typography variant="h6">
        Hello
        {/* <b>{`'${keyword}'`}</b>검색결과 */}
      </Typography>
    </Box>
  );
};

export default SearchResult;
