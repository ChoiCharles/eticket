import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SearchInput from 'components/common/Menus/SearchItems/SearchInput';

const SearchResult = () => {
  const location = useLocation();
  const searchKeyword = new URLSearchParams(location.search).get('keyword');

  return (
    <Box>
      <SearchInput />
      <Typography variant="h6">
        {searchKeyword}
        {/* <b>{`'${keyword}'`}</b>검색결과 */}
      </Typography>
    </Box>
  );
};

export default SearchResult;
