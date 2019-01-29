import React from 'react';

import LocaleToggle from '../LocaleToggle';
import ThemeSwitch from '../../components/ThemeSwitch';

import './Header.css';

const Header = () => (
  <div className="header">
    <LocaleToggle />
    <ThemeSwitch />
  </div>
);

export default Header;
