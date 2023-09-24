import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SearchInput from './SearchItems/SearchInput';
import RecentKeyword from './SearchItems/RecentKeyword';

const Search = () => {
  const [keyword, setKeyword] = useState<string>('');
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const searchKeyword = new URLSearchParams(location.search).get('keyword');
    if (searchKeyword !== null) {
      setKeyword(searchKeyword);
    }
  }, [location]);

  return (
    <Box>
      <SearchInput />
      {keyword.length > 0 ? (
        <Typography variant="h6">
          <b>{`'${keyword}'`}</b> 검색결과
        </Typography>
      ) : (
        <RecentKeyword />
      )}
    </Box>
  );
};

export default Search;
