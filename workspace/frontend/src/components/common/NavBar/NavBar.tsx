import React from 'react';
import Buttons from '../Buttons/Buttons';
import Logo from '../Logo/Logo';
import './NavBar.scss';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Logo />
      <Buttons />
    </div>
  );
};

export default NavBar;
