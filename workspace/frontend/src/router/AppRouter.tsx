import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ConcertList from 'pages/Concert/ConcertList';
import ConcertDetail from 'pages/Concert/ConcertDetail';
import Home from 'pages/Home/Home';
import Error from 'pages/Etc/Error';
import Login from 'pages/User/Login';
import Signup from 'pages/User/Signup';
import Checkout from 'pages/Payments/Checkout';
import Fail from 'pages/Payments/Fail';
import Success from 'pages/Payments/Success';
import MetamaskForm from 'pages/User/MetamaskForm';
import MyPage from 'pages/User/MyPage';
import MyTicketDetail from 'pages/User/MyTicketDetail';
import ConcertCalender from 'pages/Concert/ConcertCalender';
import SearchResult from 'pages/SearchResult/SearchResult';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/metamask" element={<MetamaskForm />} />
        <Route path="/search?keyword=:keyword" element={<SearchResult />} />
        <Route path="/concert" element={<ConcertList />} />
        <Route path="/concert/:idx" element={<ConcertDetail />} />
        <Route path="/concertCalender/:idx" element={<ConcertCalender />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/success" element={<Success />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/myticket/:idx" element={<MyTicketDetail />} />
        <Route path="/*" element={<Navigate replace to="/error" />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
