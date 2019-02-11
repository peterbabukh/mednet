import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Dashboard from '../Dashboard';
import Footer from '../Footer';
import Header from '../Header';
import Helmet from '../../components/HelmetIntl';
import injectSaga from '../../utils/injectSaga';
import messages from './messages';
import ModalRoot from '../../containers/ModalRoot';
import Sidebar from '../../components/Sidebar';
import saga from './saga';

import {
  errorInterceptor,
  responseInterceptor,
} from '../../utils/axiosInterceptors';
import { makeSelectTheme } from './selectors';

import './App.css';

const helmetMessages = {
  title: messages.appTitle,
  description: messages.appDescription,
};

export class AppComponent extends React.Component {
  render() {
    return (
      <div className="app">
        <Sidebar />
        <Header />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
        <ModalRoot />
      </div>
    );
  }
}

const NotFound = () => (
  <div className="page-not-found">
    <FormattedMessage {...messages.pageNotFound} />
  </div>
);

export class App extends React.Component {
  constructor(props) {
    super(props);

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.interceptors.response.use(
      responseInterceptor.bind(this),
      errorInterceptor(props.dispatch).bind(this),
    );
  }

  render() {
    const { theme } = this.props;

    return (
      <div className={`theme-${theme}`}>
        <Helmet messages={helmetMessages} />
        <Switch>
          <Route exact path="/" component={AppComponent} />
          <Route path="*" component={NotFound} />
        </Switch>
        <ToastContainer
          autoClose={false}
          draggablePercent={30}
          className="react-toastify__container"
          bodyClassName="react-toastify__body"
          toastClassName="react-toastify__toast"
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export const mapStateToProps = createStructuredSelector({
  theme: makeSelectTheme(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'app', saga });

const composedApp = compose(
  withSaga,
  withConnect,
)(App);

export default withRouter(composedApp);
