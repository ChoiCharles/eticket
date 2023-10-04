/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './MyPage.scss';
import React, { useState, useEffect } from 'react';
import copyText from 'assets/CopyText.png';
import dummyConcerts from 'dummys.ts';
import NFTCard from 'components/common/NFTCard/NFTCard';
import useAccount from 'hooks/useAccount';
import { useMetaData } from 'hooks/useMetaData';
import instance from 'apis/utils/instance';
import useMovePage from 'hooks/useMovePage';

interface ConcertListItem {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
}

function MyPage() {
  const { movePage } = useMovePage();
  const { account, loginMetaMask } = useAccount();
  // const { metadata, connectIPFS } = useMetaData()
  const { connectIPFS } = useMetaData();
  const [myAccount, setMyAccount] = useState('');
  const [userId, setUserId] = useState();
  const [userNickName, setUserNickName] = useState('닉네임');
  const [userName, setUserName] = useState('');
  const [myTicketData, setMyTicketData] = useState([]);

  const copyAddress = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      alert('지갑 주소가 복사되었습니다');
    } catch {
      alert('지갑 주소 복사에 실패했습니다');
    }
  };

  const handleMovePage = (myticket: ConcertListItem) => {
    movePage(`/myticket/${myticket.id}`, myticket);
  };

  const getUserData = async () => {
    const token = localStorage.getItem('accesstoken');

    if (token === null) {
      movePage(`/login`, null);
    } else {
      setUserId(JSON.parse(atob(token.split('.')[1]))['sub']);
      try {
        const userDataResponse = await instance.get(
          `/api/users/${JSON.parse(atob(token.split('.')[1]))['sub']}`,
        );
        if (userDataResponse.status === 200) {
          setUserNickName(userDataResponse.data.nickname);
          setUserName(userDataResponse.data.username);
          if (userDataResponse.data.walletAddress) {
            setMyAccount(userDataResponse.data.walletAddress);
          }
        }
      } catch (error) {
        console.log('유저 정보 호출 에러', error);
      }

      try {
        const response = await instance.get(
          `/api/reservations/${JSON.parse(atob(token.split('.')[1]))['sub']}`,
        );

        if (response.status === 200) {
          console.log('예매 정보', response.data);
          setMyTicketData(response.data);
        } else {
          alert('예매 목록을 불러오는데 실패했습니다');
        }
      } catch (error) {
        console.log('예매 정보 호출 에러', error);
      }
    }
  };

  const personal_sign = async () => {
    loginMetaMask();
    if (account != '') {
      console.log(account);
      const personalSignResult = await window.ethereum.request({
        method: 'personal_sign',
        params: [
          `I agree to register blockchain account "${account}" to Eticket account "${userName}".`,
          account,
        ],
      });
      const personalSignData = {
        personalSign: personalSignResult,
        walletAddress: account,
      };

      const personalSignVerify = await instance.post(
        `/api/users/${userId}/register-wallet`,
        personalSignData,
      );
      setMyAccount(personalSignVerify.data.walletAddress);
    }
  };

  useEffect(() => {
    connectIPFS();
    getUserData();
  }, []);

  // eslint-disable-next-line react/no-unstable-nested-components
  const MyTicket = () => {
    return (
      <div className="ticket-container">
        {myTicketData.length ? (
          <div>
            <h3>ㅎㅇ</h3>
          </div>
        ) : (
          <div>
            <h3>예매 정보가 없습니다</h3>
          </div>
        )}
        <h3>아래 정보는 더미데이터 입니다</h3>
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
        <h3 className="nickName">{userNickName}</h3>
        {myAccount === '' ? (
          <button className="edit-info" onClick={() => personal_sign()}>
            <h3 className="edit-info-text">메타마스크 연결</h3>
          </button>
        ) : (
          <></>
        )}
      </div>
      {myAccount === '' ? (
        <div className="wallet">
          <h3 style={{ marginLeft: '10px' }}>메타마스크 연동이 필요합니다</h3>
        </div>
      ) : (
        <div className="wallet">
          <h3 className="my-wallet">내 지갑 : </h3>
          <h3 className="address">{myAccount}</h3>
          <img src={copyText} alt="" onClick={() => copyAddress(account)} />
        </div>
      )}
      <div className="inventory">
        <div className="my-NFT">
          <div className="upper-text">
            <h3 className="my-NFT-text">내 NFT</h3>
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
