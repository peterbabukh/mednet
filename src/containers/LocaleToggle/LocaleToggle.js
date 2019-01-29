import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Select from '../../components/Select/Select';

import { appLocales } from '../../i18n';
import { changeLocale } from '../App/actions';
import { makeSelectLocale } from '../App/selectors';

export class LocaleToggle extends React.PureComponent {
  changeLocale = locale => () => {
    const { changeLocale } = this.props;
    changeLocale(locale);
  };

  onChange = event => {
    const { value } = event && event.target;
    value && this.props.changeLocale(value);
  };

  render() {
    const { locale, onClick } = this.props;
    const options = appLocales;
    const selectProps = {
      defaultValue: options.find(option => option === locale) || options[0],
      onChange: this.onChange,
      onClick,
    };

    return (
      <Select props={selectProps} options={options} intlKey="localeToggle" />
    );
  }
}

LocaleToggle.propTypes = {
  changeLocale: PropTypes.func,
  locale: PropTypes.string,
  dispatch: PropTypes.func,
  onClick: PropTypes.func,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    changeLocale: locale => dispatch(changeLocale(locale)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
