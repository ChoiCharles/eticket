import React from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchInput.scss';

const SearchInput = () => {
  return (
    <Paper component="form" sx={{ ml: 'auto', display: 'flex' }}>
      <IconButton type="button">
        <SearchIcon />
      </IconButton>
      <InputBase sx={{ ml: 1 }} placeholder="검색하기" />
    </Paper>
  );
};

export default SearchInput;
