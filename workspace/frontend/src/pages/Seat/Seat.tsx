import React, { useEffect, useState } from 'react';
import './Seat.scss';
import SeatSection from 'components/common/SeatSection/SeatSection';
import SeatStage from 'components/seat/SeatStage';
import Captcha from 'components/common/Captcha/Captcha';
import { Box, Modal } from '@mui/material';
import instance from 'apis/utils/instance';
import { useParams } from 'react-router-dom';
// import seatClassDummy from 'seatClassDummy';
// import seatClassRelation from 'seatClassRelation';

function Seat() {
  const [performanceInfo, setPerformanceInfo] = useState([]);
  const [seatInfo, setSeatInfo] = useState([]);
  const { seatId = 0 } = useParams();
  const performanceId = parseInt(String(seatId), 10) + 1;
  console.log(seatId);

  const getPerformances = async () => {
    try {
      const [seatRes, perRes] = await Promise.all([
        instance.get(`/api/schedules/${performanceId}/sections`),
        instance.get(`/api/performances/${performanceId}`),
      ]);
      console.log('좌석 :', seatRes.data);
      console.log('포퍼먼스 :', perRes.data);

      setPerformanceInfo(perRes.data);
      setSeatInfo(seatRes.data.sectionList);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(performanceInfo);
  console.log(seatInfo.length);
  const seatSections = seatInfo;

  useEffect(() => {
    getPerformances();
  }, []);
  // temp-controller로 보내기
  // useEffect(() => {
  //   instance
  //     .get(`/api/test`)
  //     .then(response => {
  //       console.log(response);
  //       // console.log(response.data.performance);
  //       // setData(response.data.performance);
  //       // const concertListData = hotRes;
  //     })
  //     .catch(error => console.error('Error:', error));
  // }, []);  const [openCaptcha, setOpenCaptcha] = useState<boolean>(true);

  return (
    <div>
      <Modal open={openCaptcha}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '70%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Captcha setOpenCaptcha={setOpenCaptcha} />
        </Box>
      </Modal>
      <SeatStage />
      <div className="seat-outer-box">
        <div className="seat-container">
          {seatSections.map((info, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="seat-section-wrapper">
              <SeatSection info={info} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Seat;
