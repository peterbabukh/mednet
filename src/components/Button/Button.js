import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { BUTTON_VARIANTS } from './constants';

import './Button.scss';

const getVariant = variant => {
  return typeof variant === 'object' ? variant.join(' ') : variant;
};

const variants = Object.values(BUTTON_VARIANTS);

const Button = props => {
  const { type, variant, className, text, children } = props;

  return (
    <button
      {...props}
      className={classnames('button', className, getVariant(variant))}
      type={type}
    >
      {text || children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(variants),
    PropTypes.arrayOf(PropTypes.oneOf(variants)),
  ]),
  children: PropTypes.node,
};

export default Button;
