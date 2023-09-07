import React, { useState } from 'react';
import './SignupForm.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-shadow
  // function isEmailValid({ email }: { email: string }) {
  //   // 이메일 형식을 확인하기 위한 간단한 로직
  //   // 이메일은 '@' 문자를 포함하고, '.' 문자를 포함해야 합니다.
  //   if (!email.includes('@') || !email.includes('.')) {
  //     return false;
  //   }

  //   // '@' 문자를 기준으로 이메일 주소를 분리
  //   const [, domain] = email.split('@');

  //   // 도메인 부분은 '.' 문자를 포함해야 합니다.
  //   if (!domain.includes('.')) {
  //     return false;
  //   }
  //   // '@' 문자를 포함하고, '.' 문자를 포함하며, 도메인 부분에도 '.' 문자가 있으면 유효한 이메일로 간주
  //   return true;
  // }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const newEmail = event.target.value;
    setEmail(newEmail);
    setError(true);
  };

  return (
    // 회원가입 ERD
    // 이메일, 이름, 생일, role(공연주최자, 사람), 지갑주소, 닉네임,
    <div className="Signup-box">
      <div className="Signup-outer-box">
        <div>로고</div>
        <div>회원가입</div>
        <div>이메일</div>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField
            fullWidth
            label="이메일"
            id="fullWidth"
            helperText={
              error ? '이메일을 정확히 입력해주세요' : '이메일을 입력해주세요'
            }
            error={error}
            value={email}
            onChange={handleEmailChange}
          />
        </Box>
        <div>비밀번호</div>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField
            fullWidth
            label="비밀번호"
            id="fullWidth"
            helperText="비밀번호를 입력해주세요"
          />
        </Box>
        <div>비밀번호 확인</div>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField
            fullWidth
            label="비밀번호 확인"
            id="fullWidth"
            helperText="비밀번호 확인을 입력해주세요"
          />
        </Box>
        <div className="Signup-bottom-box">
          <div className="check-login">
            <div>이미 계정이 있으신가요?</div>
            <div> 로그인 </div>
          </div>
          <div>
            <Button variant="contained">로그인</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
