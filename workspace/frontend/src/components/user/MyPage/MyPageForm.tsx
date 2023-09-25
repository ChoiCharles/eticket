/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './MyPage.scss';
import React, { useEffect } from 'react';

import copyText from 'assets/CopyText.png';

import dummyConcerts from 'dummys.ts';

import NFTCard from 'components/common/NFTCard/NFTCard';

import useAccount from 'hooks/useAccount';
import { useMetaData } from 'hooks/useMetaData';
import useMovePage from 'hooks/useMovePage';

interface ConcertListItem {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
}

function MyPage() {
  const { account, loginMetaMask } = useAccount();
  // const { metadata, connectIPFS } = useMetaData()
  const { connectIPFS } = useMetaData();

  const copyAddress = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      alert('지갑 주소가 복사되었습니다');
    } catch {
      alert('지갑 주소 복사에 실패했습니다');
    }
  };

  const { movePage } = useMovePage();

  const handleMovePage = (myticket: ConcertListItem) => {
    movePage(`/myticket/${myticket.id}`, myticket);
  };

  useEffect(() => {
    loginMetaMask();
    connectIPFS();
  }, []);

  // eslint-disable-next-line react/no-unstable-nested-components
  const MyTicket = () => {
    return (
      <div className="ticket-container">
        {dummyConcerts.map((info: ConcertListItem) => {
          return (
            <div className="concert-container">
              <div className="my-concert" onClick={() => handleMovePage(info)}>
                <div className="concert-poster">
                  <img src={info.image} alt="" />
                </div>
                <div className="concert-info">
                  <div className="conert-info-box">
                    <div className="concert-title">
                      <h3>{info.title}</h3>
                    </div>
                    <div className="concert-date">
                      <h4>{info.date}</h4>
                    </div>
                  </div>
                  <div className="my-ticket-arrow">
                    <h3>{'>'}</h3>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="my-info">
        <h3 className="nickName">닉네임</h3>
        <button className="edit-info">
          <h4 className="edit-info-text">회원정보수정</h4>
        </button>
      </div>
      <div className="wallet">
        <h3 className="my-wallet">내 지갑 : </h3>
        <h3 className="address">{account}</h3>
        <img src={copyText} alt="" onClick={() => copyAddress(account)} />
      </div>
      <div className="inventory">
        <div className="my-NFT">
          <div className="upper-text">
            <h3 className="my-NFT-text">NFT 전시장</h3>
            <h3 className="my-NFT-more">더보기 {'>'}</h3>
          </div>
          <div className="NFT-list">
            <NFTCard />
            <NFTCard />
          </div>
        </div>
        <div className="my-ticket">
          <div className="upper-text">
            <h3 className="my-ticket-text">내 티켓</h3>
            <h3 className="my-ticket-more">구매 내역 {'>'}</h3>
          </div>
          <div className="my-ticket-list">
            <MyTicket />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
