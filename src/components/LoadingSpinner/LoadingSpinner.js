import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { LOADING_SPINNER_SIZES } from './constants';

import './LoadingSpinner.css';

const LoadingSpinner = ({ className, size }) => (
  <div className={classnames('loading-spinner', className, size)} />
);

LoadingSpinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(LOADING_SPINNER_SIZES)),
};

export default LoadingSpinner;
