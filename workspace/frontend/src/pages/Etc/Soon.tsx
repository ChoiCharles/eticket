import BackNavBar from 'components/common/BackNavBar/BackNavBar';
import React from 'react';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90vh',
  backgroundColor: '#f2f2f2',
};

const messageStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#333',
  marginBottom: '20px',
};

const waitStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  color: '#777',
};

function Soon() {
  return (
    <div>
      <BackNavBar title="" />
      <div style={containerStyle}>
        <div style={messageStyle}>서비스 준비 중입니다</div>
        <div style={waitStyle}>잠시만 기다려 주세요</div>
      </div>
    </div>
  );
}

export default Soon;
