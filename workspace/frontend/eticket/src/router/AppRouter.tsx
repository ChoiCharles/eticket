import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ConcertList from 'pages/ConcertList.tsx';
import Home from '../pages/Home.tsx';
import Login from '../pages/Login.tsx';
import Signup from '../pages/Signup.tsx';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/concert-list" element={<ConcertList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
