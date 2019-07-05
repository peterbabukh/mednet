import React from 'react';
import PropTypes from 'prop-types';

import './formFields.css';

const input = ({
  input,
  label,
  type,
  className = '',
  meta: { touched, error },
}) => (
  <div className="form__container">
    <label className="form__label" htmlFor={`form.${input.name}`}>
      {label}
    </label>
    <div className="form__container-input">
      <input
        id={`form.${input.name}`}
        className={className}
        {...input}
        placeholder=""
        type={type}
      />
      {touched && error && <span className="form__error">{error}</span>}
    </div>
  </div>
);

input.propTypes = {
  id: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
  meta: PropTypes.object,
};

export default input;
