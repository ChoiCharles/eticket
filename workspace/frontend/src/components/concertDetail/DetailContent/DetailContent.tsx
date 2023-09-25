import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import DetailImg from 'assets/emphisDetail.svg';
import ImgDetail from 'components/concertDetail/ImgDetail/ImgDetail';
import './DetailContent.scss';
import PriceInfo from '../PriceInfo/PriceInfo';

const tabContentStyles = {
  textAlign: 'center', // 가운데 정렬
  padding: '20px', // 내부 여백
  fontSize: '1.2rem', // 폰트 크기
};

/** params 공연정보 전체가져와서
 *  공연정보, 공연기간, 공연장, 관람시간
 *  좌석 레벨 and 좌석 가격
 *  + 상세정보 이미지
 */
export default function DetailContent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const defaultImg =
    'https://ticketimage.interpark.com/Play/ITM/Data/Modify/2023/7/2023071116224408.jpg';

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
          sx={{
            // backgroundColor: 'lightgray', // 탭 바의 배경색
            borderRadius: '15px', // 탭 바의 둥근 모서리
          }}
        >
          <Tab
            label="공연정보"
            sx={{
              borderRadius: '15px 0 0 0', // 첫 번째 탭의 왼쪽 모서리만 둥글게
            }}
          />
          <Tab label="공연장정보" />
          <Tab
            label="QnA"
            sx={{
              borderRadius: '0 15px 0 0', // 마지막 탭의 오른쪽 모서리만 둥글게
            }}
          />
        </Tabs>
      </AppBar>
      <Box
        role="tabpanel"
        hidden={value !== 0}
        id="tabpanel-0"
        aria-labelledby="tab-0"
        sx={{ width: '100%' }} // 중괄호로 감싸기
      >
        {/* 공연정보 컨텐츠 */}
        <div>
          <div className="notice-text">NOTICE</div>
          <div>
            <ImgDetail descImgUrl={defaultImg} />
            <PriceInfo />
          </div>
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
          <h2>서울 잠실종합운동장 올림픽 주경기장</h2>
          <div>맵 API</div>
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
