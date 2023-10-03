import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Signup from 'pages/User/Signup';
import Login from 'pages/User/Login';
import MetamaskForm from 'pages/User/MetamaskForm';
import Search from 'pages/Search/Search';
import ConcertList from 'pages/Concert/ConcertList';
import ConcertDetail from 'pages/Concert/ConcertDetail';
import Waiting from 'pages/Waiting/Waiting';
import ConcertCalender from 'pages/Concert/ConcertCalender';
import Seat from 'pages/Seat/Seat';
import Checkout from 'pages/Checkout/Checkout';
import Success from 'components/checkout/Success';
import MyPage from 'pages/User/MyPage';
import MyTicketDetail from 'pages/User/MyTicketDetail';
import NFTGallery from 'pages/Etc/NFTGallery';
import Error from 'pages/Etc/Error';
import Soon from 'pages/Etc/Soon';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/metamask" element={<MetamaskForm />} />
        <Route path="/search" element={<Search />} />
        <Route path="/concert" element={<ConcertList />} />
        <Route path="/concert/:performanceId" element={<ConcertDetail />} />
        <Route path="/waiting/:waitingId/:dateId" element={<Waiting />} />
        <Route
          path="/concertCalender/:performanceScheduleId"
          element={<ConcertCalender />}
        />
        <Route path="/seat/:seatId/:dateId" element={<Seat />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/soon" element={<Soon />} />
        <Route path="/receipts" element={<Soon />} />
        <Route path="/fail" element={<Navigate replace to="/checkout" />} />
        <Route path="/success" element={<Success />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/myticket/:idx" element={<MyTicketDetail />} />
        <Route path="/gallery" element={<NFTGallery />} />
        <Route path="/*" element={<Navigate replace to="/error" />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
