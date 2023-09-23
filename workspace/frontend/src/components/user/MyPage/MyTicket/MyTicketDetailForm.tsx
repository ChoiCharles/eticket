import './MyTicketDetail.scss';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import QRcode from 'qrcode.react'

import dummyConcerts from 'dummys.ts'

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

  const [getQRcode, setGetQRcode] = useState(false)

  const { idx } = useParams();
  console.log(idx)

  const createQR = () => {
    setGetQRcode(true)
  }

  return (
    <div className="container">
      {
        dummyConcerts.map((info:ConcertListItem) => {
          if (info.id === Number(idx)) {
            return (
              <div className="my-ticket-detail">
                <div className="my-ticket-info">
                  <h3>{info.title}</h3>
                  <h3>좌석, 인원</h3>
                  <h3>{info.date}</h3>
                </div>
                <div className="slide-image">
                  <h3>움직이는 이미지</h3>
                </div>
                <div className="my-ticket-image">
                  {
                    getQRcode ? 
                      <div className="QRcode">
                        <QRcode 
                          id="myqr"
                          value={JSON.stringify(info)} 
                          size={320}
                          includeMargin={true}
                        />
                      </div> :
                      <div>
                        <img src={info.image} alt=""/>
                        <button onClick={() => createQR()}><h3>QR 코드 생성</h3></button>
                      </div>
                  }
                </div>
              </div>
            )
          }
        })
      }
    </div>
  );
}

export default MyTicket;
