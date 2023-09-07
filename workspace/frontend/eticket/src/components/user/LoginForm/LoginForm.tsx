import React, { useState } from 'react';
import './LoginForm.scss';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [usernameData, setUsernameData] = useState('');
  const [passwordDadta, setPasswordData] = useState('');

  const getUsernameData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameData(event.target.value);
  };

  const getPasswordData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(event.target.value);
  };

  const ClickBtn = () => {
    console.log(usernameData);
    console.log(passwordDadta);
  };
  return (
    <div className="login-box">
      <div className="login-outer-box">
        <div>🦄 ETHICKET</div>
        <div className="page-name-title">로그인</div>
        <div>아이디</div>
        <TextField
          fullWidth
          id="fullWidth"
          onChange={getUsernameData}
          //   error={userNameError}
        />
        <div>비밀번호</div>
        <TextField
          id="outlined-password-input"
          type="password"
          autoComplete="current-password"
          onChange={getPasswordData}
          sx={{ width: '100%' }} // 가로 전체 너비 스타일을 추가
        />
        <div className="signup-bottom-box">
          <div className="check-login">
            <div
              className="text-login-underline"
              onClick={() => navigate('/signup')}
              aria-hidden="true"
            >
              회원가입
            </div>
          </div>

          <div>
            <Button variant="contained" type="button" onClick={ClickBtn}>
              로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
