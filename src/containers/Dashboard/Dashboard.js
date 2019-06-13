import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import Helmet from '../../components/HelmetIntl';
import messages from './messages';
import AsideBlock from '../../components/AsideBlock/AsideBlock';

import './Dashboard.css';

const helmetMessages = {
  title: messages.dashboardTitle,
  description: messages.dashboardDescription,
};

class Dashboard extends React.PureComponent {
  render() {
    return (
      <div className="dashboard">
        <Helmet messages={helmetMessages} />
        <div>Dashboard content goes here</div>
        <ul className="about-health__list">
          <li className="about-health__item">
            <Link to="/" className="about-health__link">
              <FormattedMessage {...messages.aboutHealthProblemYes} />
            </Link>
          </li>
          <li className="about-health__item">
            <Link to="/happy-user" className="about-health__link">
              <FormattedMessage {...messages.aboutHealthProblemNo} />
            </Link>
          </li>
        </ul>
        <AsideBlock />
      </div>
    );
  }
}

export default Dashboard;
