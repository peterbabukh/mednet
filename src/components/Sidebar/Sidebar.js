import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import ThemeSwitch from '../../components/ThemeSwitch';
import { contactsMap } from '../../constants';

import mednetLogo from '../../assets/images/mednet-logo.png';

import './Sidebar.css';

class Sidebar extends React.Component {
  state = {
    isSidebarOpened: false,
  };

  sidebarOnCloseHandler = () => {
    this.setState({ isSidebarOpened: false });
  };

  toggleSidebar = () => {
    const { isSidebarOpened } = this.state;
    this.setState({ isSidebarOpened: !isSidebarOpened });
  };

  getContactItem = ({ name, link, to }) => {
    return (
      <li key={`contacts-contact-${name}`} className="sidebar__contact-item">
        <a
          href={`${to}${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar__contact-link"
        >
          <FormattedMessage {...messages[name]} />
        </a>
      </li>
    );
  };

  render() {
    const { isSidebarOpened } = this.state;
    let sidebarContent = '';

    if (!isSidebarOpened) {
      sidebarContent = (
        <i
          onClick={this.toggleSidebar}
          className="sidebar__menu-hamburger fa fa-bars"
        />
      );
    } else {
      sidebarContent = (
        <div className="sidebar__menu-content">
          <i
            onClick={this.sidebarOnCloseHandler}
            className="sidebar__close-btn fa fa-times"
          />
          <img
            src={mednetLogo}
            alt={<FormattedMessage {...messages.logoAlt} />}
            title={<FormattedMessage {...messages.logoTitle} />}
            className="sidebar__logo-img"
          />
          <ul className="sidebar__contact-list">
            {contactsMap.map(el => this.getContactItem(el)).valueSeq()}
          </ul>
          <hr />
          <ThemeSwitch />
        </div>
      );
    }

    return <div className="sidebar">{sidebarContent}</div>;
  }
}

export default Sidebar;
