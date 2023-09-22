import './MyTicketDetail.scss';
import React from 'react';
import { useParams } from 'react-router-dom';

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

  const { idx } = useParams();
  console.log(idx)




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
                  <img src={info.image} alt=""/>
                  <button><h3>QR 코드 생성</h3></button>
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
