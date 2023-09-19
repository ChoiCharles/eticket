import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import ImgDetail from 'assets/emphisDetail.svg';

const tabContentStyles = {
  textAlign: 'center', // 가운데 정렬
  padding: '20px', // 내부 여백
  fontSize: '1.2rem', // 폰트 크기
};

export default function ResponsiveTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        // width: '100%', // 100% 너비로 설정
        // maxWidth: '450px', // 최대 너비 450px
        margin: '0 auto', // 가운데 정렬
        position: 'relative',
        // minHeight: '100vh', // 화면 높이에 맞게 조절
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // padding: '50px 0px',
        gap: '20px',
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="공연정보" />
          <Tab label="공연장정보" />
          <Tab label="QnA" />
        </Tabs>
      </AppBar>
      <Box
        role="tabpanel"
        hidden={value !== 0}
        id="tabpanel-0"
        aria-labelledby="tab-0"
        sx={{ width: '80%' }} // 중괄호로 감싸기
      >
        {/* 공연정보 컨텐츠 */}
        <div>
          <h2>공연정보</h2>
          <h2>공연기간: ~</h2>
          <h2>공연장: 위치 ~</h2>
          <h2>관람시간: 시간 ~ ~</h2>
          {/* <ImgDetail descImgUrl={ImgDetail} /> */}
          {/* 여기에 공연정보 컨텐츠 내용을 추가 */}
        </div>
      </Box>
      <Box
        role="tabpanel"
        hidden={value !== 1}
        id="tabpanel-1"
        aria-labelledby="tab-1"
        sx={tabContentStyles}
      >
        {/* 공연장정보 컨텐츠 */}
        <div>
          <h2>공연장정보</h2>
          {/* 여기에 공연장정보 컨텐츠 내용을 추가 */}
        </div>
      </Box>
      <Box
        role="tabpanel"
        hidden={value !== 2}
        id="tabpanel-2"
        aria-labelledby="tab-2"
        sx={tabContentStyles}
      >
        {/* QnA 컨텐츠 */}
        <div>
          <h2>QnA</h2>
          {/* 여기에 QnA 컨텐츠 내용을 추가 */}
        </div>
      </Box>
    </Box>
  );
}
