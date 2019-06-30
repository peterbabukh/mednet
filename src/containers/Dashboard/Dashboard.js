import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  withRouter,
  BrowserRouter,
  Link,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import Helmet from '../../components/HelmetIntl';
import messages from './messages';
import { HappyUserPage } from '../../modules/customer/containers/HappyUserPage';

import './Dashboard.scss';

const helmetMessages = {
  title: messages.dashboardTitle,
  description: messages.dashboardDescription,
};

const NotFound = () => (
  <div className="page-not-found">
    <FormattedMessage {...messages.pageNotFound} />
  </div>
);

class Dashboard extends React.PureComponent {
  aboutHealthButtons = () => {
    return (
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
    );
  };

  render() {
    return (
      <BrowserRouter>
        <div className="dashboard">
          <Helmet messages={helmetMessages} />
          <Switch>
            <Route exact path="/" component={this.aboutHealthButtons} />
            <Route path="/happy-user" component={HappyUserPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'dashboard', saga });

const composedDashboard = compose(
  withSaga,
  withConnect,
)(Dashboard);

export default withRouter(composedDashboard);
