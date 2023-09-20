import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ConcertList from 'pages/Concert/ConcertList';
import ConcertDetail from 'pages/Concert/ConcertDetail';
import Home from 'pages/Home/Home';
import Login from 'pages/User/Login';
import Signup from 'pages/User/Signup';
import Checkout from 'pages/Payments/Checkout';
import Fail from 'pages/Payments/Fail';
import Success from 'pages/Payments/Success';
import MetamaskForm from 'pages/User/MetamaskForm';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/metamask" element={<MetamaskForm />} />
        <Route path="/concert" element={<ConcertList />} />
        <Route path="/concert/:idx" element={<ConcertDetail />} />
        {/* <Route path="/reservation/:idx" element={<ConcertDetail />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
