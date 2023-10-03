import './NFTCard.scss';
import React from 'react';

import testimage from 'assets/test.jfif';

function NFTCard() {
  return (
    <div className="NFTContainer">
      <div className="NFTCard">
        {/* <img src={metadata?.image} alt="your NFT" /> */}
        <img src={testimage} alt="your NFT" />
        <div className="NFTInfo">
          <h4>내 NFT</h4>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
