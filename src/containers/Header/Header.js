import React from 'react';

import LocaleToggle from '../LocaleToggle';
import ThemeSwitch from '../../components/ThemeSwitch';

import './Header.scss';

const Header = () => (
  <div className="header">
    <LocaleToggle />
    <ThemeSwitch />
  </div>
);

export default Header;
