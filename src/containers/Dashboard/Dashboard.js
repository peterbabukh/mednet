import React from 'react';

import Helmet from '../../components/HelmetIntl';
import messages from './messages';

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
      </div>
    );
  }
}

export default Dashboard;
