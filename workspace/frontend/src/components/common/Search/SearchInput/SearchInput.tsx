import React from 'react';
import { Paper, InputBase, IconButton, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import './SearchInput.scss';

const SearchInput = () => {
  return (
    <Toolbar>
      <Paper
        component="form"
        sx={{ mr: 'auto', width: '100%', display: 'flex', border: '2px solid' }}
      >
        <InputBase
          sx={{ ml: 2 }}
          fullWidth
          placeholder="어떤 공연을 찾으시나요?"
        />
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
      </Paper>
      <IconButton sx={{ ml: 2 }}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Toolbar>
  );
};

export default SearchInput;
