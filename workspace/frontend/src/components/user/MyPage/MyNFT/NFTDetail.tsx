import './NFTDetail.scss';
import React from 'react';
import testimage from 'assets/test.jfif';
import NavBar from 'components/common/NavBar/NavBar'
// import useMetaData from 'hooks/useMetaData';

function NFTDetail() {
  // const { metadata } = useMetaData()
  // const NFTImage = metadata?.image
  // const NFTName = metadata?.name
  // const NFTAttributes = metadata?.attributes

  return (
    <div>
      <NavBar/>
      <div className="NFTContainer-detail">
        <div className="NFTCard-detail">
          <div className="NFTCardImg-detail">
            <img src={testimage} alt="NFT Image" style={{width: '100%', height: '100%'}}/>
            {/* <img src={NFTImage} alt="NFT Image" style={{width: '100%', height: '100%'}}/> */}
          </div>
        </div>
        <div className="NFTInfo-detail">
          <h3>이름 : 내 NFT</h3>
          <h3>좌석 : s석 1번</h3>
          {/* <h3>이름 : {NFTName}</h3>
          <h3>좌석 : {NFTAttributes[1].value} {NFTAttributes[0].value}</h3> */}
        </div>
      </div>
    </div>
  );
}

export default NFTDetail;
