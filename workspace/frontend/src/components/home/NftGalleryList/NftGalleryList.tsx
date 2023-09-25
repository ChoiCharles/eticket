import React from 'react';
import Carousel from 'components/common/Carousel/Carousel';
import { Button, Typography } from '@mui/material';
import useMovePage from 'hooks/useMovePage';

import './NftGalleryList.scss';

const NftGalleryList = () => {

  const { movePage } = useMovePage();

  const handleMovePage = () => {
    movePage('/gallery', null);
  };

  return (
    <div className="nft-gallery">
      <Typography variant="h6">NFT 전시장</Typography>
      <Carousel />
      <Button fullWidth variant="contained" onClick={() => handleMovePage()}>
        전체 보기
      </Button>
    </div>
  );
};

export default NftGalleryList;
