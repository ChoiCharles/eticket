import './NFTGallery.scss';
import React from 'react';

import NFTCard from 'components/common/NFTCard/NFTCard'


function NFTGalleryForm() {

  return (
    <div className="container">
      <h1>GALLERY</h1>

      <div className="NFT-list">
        <NFTCard/>
        <NFTCard/>
        <NFTCard/>
      </div>
    </div>
  );
}

export default NFTGalleryForm;
