import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Box,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  keywords: { id: number; keyword: string }[];
  handleAddKeyword: (keyword: string) => void;
  setKeywords: (prev: any) => void;
}

const SearchInput = ({ keywords, handleAddKeyword, setKeywords }: Props) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event?.preventDefault();
    if (!keyword.trim()) {
      return;
    }

    const keywordList = keywords.map(item => item.keyword);
    if (keywordList.includes(keyword)) {
      const filteredKeywords = keywords.filter(
        item => item.keyword !== keyword,
      );
      handleAddKeyword(keyword);
      setKeywords([{ id: Date.now(), keyword }, ...filteredKeywords]);
    } else {
      handleAddKeyword(keyword);
    }
    setKeyword('');
  };

  return (
    <Toolbar>
      <Box
        component="form"
        sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
        onSubmit={handleSubmit}
      >
        <TextField
          hiddenLabel
          variant="outlined"
          margin="dense"
          color="success"
          size="small"
          autoFocus
          fullWidth
          placeholder="어떤 공연을 찾으시나요?"
          value={keyword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="button" onClick={handleSubmit}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: '#F2F2F7',
            ' .Mui-focused': {
              backgroundColor: 'white',
            },
          }}
        />
        <IconButton sx={{ ml: 2 }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default SearchInput;
