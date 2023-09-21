import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SearchInput from './SearchItems/SearchInput';
import RecentKeyword from './SearchItems/RecentKeyword';
import SearchResult from './SearchItems/SearchResult';

const Search = () => {
  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  const handleAddKeyword = (keyword: string) => {
    const addedKeywords = {
      id: Date.now(),
      keyword,
    };
    setKeywords([addedKeywords, ...keywords]);
  };

  const handleRemoveKeyword = (id: number) => {
    const removedKeyword = keywords.filter(
      (keyword: { id: number; keyword: string }) => {
        return keyword.id !== id;
      },
    );
    setKeywords(removedKeyword);
  };

  const handleClearKeywords: () => void = () => {
    setKeywords([]);
  };

  return (
    <Box>
      <SearchInput
        keywords={keywords}
        handleAddKeyword={handleAddKeyword}
        setKeywords={setKeywords}
      />
      <RecentKeyword
        keywords={keywords}
        handleRemoveKeyword={handleRemoveKeyword}
        handleClearKeywords={handleClearKeywords}
      />
      <SearchResult keyword={keywords[0].keyword} />
    </Box>
  );
};

export default Search;
