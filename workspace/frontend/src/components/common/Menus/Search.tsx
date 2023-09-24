import React from 'react';
import { Box } from '@mui/material';
import useSearch from 'hooks/useSearch';
import SearchInput from './SearchItems/SearchInput';
import RecentKeyword from './SearchItems/RecentKeyword';

const Search = () => {
  const { keywords, handleRemoveKeyword, handleClearKeywords } = useSearch();

  return (
    <Box>
      <SearchInput />
      <RecentKeyword
        keywords={keywords}
        handleRemoveKeyword={handleRemoveKeyword}
        handleClearKeywords={handleClearKeywords}
      />
    </Box>
  );
};

export default Search;
