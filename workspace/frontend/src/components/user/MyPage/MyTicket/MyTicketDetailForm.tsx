/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
import './MyTicketDetail.scss';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import QRcode from 'qrcode.react';
import { Box, Typography, Modal } from '@mui/material';

import dummyConcerts from 'dummys.ts';

import SlidingImage from './SlidingImage';

// 예매 취소 api 연결필요
// import instance from 'apis/utils/instance';
// import useMovePage from 'hooks/useMovePage';

interface ConcertListItem {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '70%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '0px',
  boxShadow: 24,
  p: 4,
};

function MyTicket() {
  // const movePage = useMovePage();

  // const handleMovePage = () => {
  //   movePage('/login', null);
  // };

  const { idx } = useParams();
  console.log(idx);

  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState(0);

  const [openCancelModal, setOpenCancelModal] = useState(false);
  
  // 예매 취소 api 연결필요
  // const { goBack } = useMovePage();

  const imageFlip = () => {
    if (isFlipped) {
      setRotate(0);
      setIsFlipped(false);
    } else {
      setRotate(180);
      setIsFlipped(true);
    }
  };

  const askCancellReservation = () => {
    setOpenCancelModal(true)
  }

  const closeCancelModal = () => {
    setOpenCancelModal(false)
  }

  const cancellReservation = async () => {
    console.log('취소')
    
    // 예매 취소 api 연결필요
    // try {
    //   const response = await instance.put(`/reservations/${id}`)
      
    //   if (response.status === 200) {
    //     alert('예매 취소되었습니다')
    //     goBack()
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <div className="container">
      {dummyConcerts.map((info: ConcertListItem) => {
        if (info.id === Number(idx)) {
          return (
            <div className="my-ticket-detail">
              <div className="my-ticket-info">
                <h3>{info.title}</h3>
                <h3>좌석, 인원</h3>
                <h3>{info.date}</h3>
              </div>
              <div className="slide-image">
                <SlidingImage />
              </div>
              <div className="my-ticket-image">
                <div
                  className="card-inner"
                  style={{ transform: `rotateY(${rotate}deg)` }}
                >
                  <div className="card-front">
                    <img src={info.image} alt="" />
                  </div>
                  <div className="card-back">
                    <div className="QRcode">
                      <QRcode
                        id="myqr"
                        value={JSON.stringify(info)}
                        size={320}
                        includeMargin
                      />
                    </div>
                  </div>
                </div>
                {isFlipped ? (
                  <button onClick={imageFlip}>
                    <h3>포스터</h3>
                  </button>
                ) : (
                  <button onClick={imageFlip}>
                    <h3>QR 코드 생성</h3>
                  </button>
                )}
              </div>
              <div className="cancel-reservation">
                <button onClick={() => askCancellReservation()}>
                  <h3>예매 취소</h3>
                </button>
              </div>
            </div>
          );
        }
      })}
      <Modal open={openCancelModal}>
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h3">
              정말 취소하시겠습니까?
            </Typography>
          <div className="ask-cancel">
            <button className="ask-yes" onClick={() => cancellReservation()}>
              <h3>예</h3>
            </button>
            <button className="ask-no" onClick={() => closeCancelModal()}>
              <h3>아니요</h3>
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default MyTicket;
