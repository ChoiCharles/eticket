import React from 'react';
import Buttons from 'components/common/Buttons/Buttons';
import Logo from 'components/common/Logo/Logo';

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
