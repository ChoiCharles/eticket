import React, { useState } from 'react';
import './Seat.scss';
import SeatSection from 'components/common/SeatSection/SeatSection';
import SeatStage from 'components/seat/SeatStage';
import Captcha from 'components/common/Captcha/Captcha';
import { Box, Modal } from '@mui/material';

function Seat() {
  // SeatSection을 10번 반복하는 배열 생성
  const seatSections = Array(12).fill(null);
  const [openCaptcha, setOpenCaptcha] = useState<boolean>(true);

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
          {/* <div className="modal-frame">good</div> */}
          {/* <SeatStage /> */}
          {seatSections.map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="seat-section-wrapper">
              <SeatSection index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Seat;
