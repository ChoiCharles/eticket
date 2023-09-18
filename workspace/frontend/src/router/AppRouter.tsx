import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ConcertList from 'pages/ConcertList';
import Home from 'pages/Home/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Checkout from 'pages/Payments/Checkout';
import Fail from 'pages/Payments/Fail';
import Success from 'pages/Payments/Success';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/concert-list" element={<ConcertList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
