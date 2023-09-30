/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
import './MyTicketDetail.scss';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import QRcode from 'qrcode.react';

import dummyConcerts from 'dummys.ts';

import SlidingImage from '../SlidingImage'

// import useMovePage from 'hooks/useMovePage';

interface ConcertListItem {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
}

function MyTicket() {
  // const movePage = useMovePage();

  // const handleMovePage = () => {
  //   movePage('/login', null);
  // };

  const { idx } = useParams();
  console.log(idx);

  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState(0)

  const imageFlip = () => {

    if (isFlipped) {
      setRotate(0)
      setIsFlipped(false)
    } else {
      setRotate(180)
      setIsFlipped(true)
    }
  };

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
                <SlidingImage/>
              </div>
              <div className="my-ticket-image">
                <div className="card-inner" style={{transform: `rotateY(${rotate}deg)`}}>
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
                {
                  isFlipped ? 
                  <button onClick={imageFlip}>
                    <h3>포스터</h3>
                  </button>
                  :
                  <button onClick={imageFlip}>
                    <h3>QR 코드 생성</h3>
                  </button>
                }
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default MyTicket;
