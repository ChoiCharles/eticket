import './MetamaskLogin.scss';
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Eticket from 'assets/ETICKET.svg';
import metamaskImg from 'assets/MetaMask.png';

function MetamaskLogin() {
  const navigate = useNavigate();
  // 메타마스크 주소 받기
  const [metaAddress, setMetaAddress] = useState('');
  // 메타마스크 주소를 저장해서 axios보내기
  const metaAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const walletAddress = event.target.value;
    setMetaAddress(walletAddress);
  };
  const connectBtn = () => {
    console.log(metaAddress);
  };
  const moveHome = () => {
    navigate('/');
  };

  // const connectWalletBtn = async () => {
  //   try {
  //     if (window.ethereum) {
  //       // MetaMask 연결 요청
  //       const accounts = await window.ethereum.request({
  //         method: 'eth_requestAccounts',
  //       });

  //       if (accounts.length > 0) {
  //         const userAddress = accounts[0];
  //         setMetaAddress(userAddress);
  //         console.log('연결된 계정 주소:', userAddress);

  //         // 여기에서 원하는 페이지로 이동
  //         navigate('/metamask-account', { state: { address: userAddress } });
  //       }
  //     } else {
  //       console.error('MetaMask를 찾을 수 없습니다.');
  //     }
  //   } catch (error) {
  //     console.error('MetaMask 연동 중 오류 발생:', error);
  //   }
  // };
  return (
    <div className="meta-box">
      <div className="meta-outer-box">
        <div className="logo-box">
          <img src={Eticket} alt="" />
        </div>
        <div className="page-name-title">메타마스크 연동</div>
        <TextField fullWidth id="fullWidth" onChange={metaAddressChange} />
        <Button
          variant="contained"
          type="button"
          onClick={connectBtn}
          style={{
            background: '#80C0C0',
            color: 'white',
            width: '100%',
            height: '50px',
          }}
        >
          연동하기
        </Button>
        <Button
          variant="contained"
          type="button"
          style={{
            background: '#F2F4F6',
            color: '#80C0C0',
            width: '100%',
            height: '50px',
          }}
        >
          <div
            className="metamask-logo-contain"
            // onClick={connectWalletBtn}
            aria-hidden
          >
            <div className="meta-logo-text">메타마스크</div>
            <div className="meta-logo-box">
              <img
                src={metamaskImg}
                alt="메타마스크"
                style={{ width: '30px', height: '30px' }}
              />
            </div>
          </div>
        </Button>
        <div className="next-time-connect" onClick={moveHome} aria-hidden>
          나중에 연동하시겠습니까?{' '}
        </div>
      </div>
    </div>
  );
}

export default MetamaskLogin;
