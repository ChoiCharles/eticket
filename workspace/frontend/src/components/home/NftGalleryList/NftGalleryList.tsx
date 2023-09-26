import React from 'react';
import Carousel from 'components/common/Carousel/Carousel';
import { Box, Button, Typography } from '@mui/material';
import useMovePage from 'hooks/useMovePage';

const NftGalleryList = () => {
  const { movePage } = useMovePage();

  const handleMovePage = () => {
    movePage('/gallery', null);
  };

  return (
    <Box>
      <Typography variant="h6">NFT 전시장</Typography>
      <Carousel />
      <Button fullWidth variant="contained" onClick={() => handleMovePage()}>
        전체 보기
      </Button>
    </Box>
  );
};

export default NftGalleryList;
