import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Box,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useMovePage from 'hooks/useMovePage';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleAddKeyword: (keyword: string) => void;
  handleToggleSearch: () => void;
}

const SearchInput = ({ handleAddKeyword, handleToggleSearch }: Props) => {
  const [keyword, setKeyword] = useState('');
  const { movePage } = useMovePage();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClearKeyword = () => {
    setKeyword('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    if (!keyword.trim()) {
      return;
    }

    await handleAddKeyword(keyword);
    setKeyword('');

    movePage(`/search?${keyword}`, null);
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
                {keyword && (
                  <IconButton type="button" onClick={handleClearKeyword}>
                    <CancelIcon fontSize="small" />
                  </IconButton>
                )}
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
        <IconButton sx={{ mt: 0.5, ml: 1 }} onClick={handleToggleSearch}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default SearchInput;
