import './NFTCard.scss';
import React from 'react';
import testimage from 'assets/test.jfif';
import useMovePage from 'hooks/useMovePage';
// import useMetaData from 'hooks/useMetaData';

function NFTCard() {
  const { movePage } = useMovePage();

  // const { metadata } = useMetaData()
  // const NFTImage = metadata?.image
  // const NFTName = metadata?.name

  return (
    <div className="NFTContainer">
      <div className="NFTCard" onClick={() => movePage('/nftdetail', null)}>

        {/* <img src={NFTImage} alt="your NFT" />
        <div className="NFTInfo">
          <h4>{NFTName}</h4>
        </div> */}

        <img src={testimage} alt="your NFT" />
        <div className="NFTInfo">
          <h4>내 NFT</h4>
        </div>

      </div>
    </div>
  );
}

export default NFTCard;
