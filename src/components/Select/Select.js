import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import { toType } from '../../utils/common';

import './Select.scss';

export const getValue = option => {
  return option.value || (option.value === '' || option.value === 0)
    ? option.value
    : option;
};

export const getDescription = ({ option, intl, intlKey }) => {
  const translatedOption =
    intlKey &&
    intl.messages[
      `${intlKey}.${
        toType(option) === 'string'
          ? option
          : option.description || option.value
      }`
    ];

  return toType(option) === 'string'
    ? translatedOption || option
    : toType(option) === 'object' &&
      option.description === '' &&
      option.value === ''
    ? '---'
    : option.description || option.value;
};

export const Select = ({ props, options, intl, intlKey, className }) => (
  <div
    className={classnames('select-container', className, {
      disabled: props && props.disabled,
    })}
  >
    <select className={className} {...props}>
      {options.map((option, index) => {
        return (
          <option value={getValue(option)} key={`option-${index}`}>
            {getDescription({ option, intl, intlKey })}
          </option>
        );
      })}
    </select>
  </div>
);

Select.propTypes = {
  props: PropTypes.object,
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  intl: intlShape,
  intlKey: PropTypes.string,
  disabled: PropTypes.bool,
};

export default injectIntl(Select);
