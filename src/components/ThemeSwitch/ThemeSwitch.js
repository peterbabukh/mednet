import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Select from '../Select';
import { setTheme } from '../../containers/App/actions';
import { makeSelectTheme } from '../../containers/App/selectors';
import { DEFAULT_THEME, DARK_THEME } from '../../containers/App/constants';

import './ThemeSwitch.scss';

export class ThemeSwitch extends React.PureComponent {
  onChange = event => {
    const { value } = event && event.target;
    value && this.props.setTheme(value);
  };

  render() {
    const { theme, onClick } = this.props;
    const options = [DEFAULT_THEME, DARK_THEME];
    const selectProps = {
      value: options.find(option => option === theme) || options[0],
      onChange: this.onChange,
      onClick,
    };

    return (
      <Select
        className="theme-switch"
        props={selectProps}
        options={options}
        intlKey="site.theme"
      />
    );
  }
}

ThemeSwitch.propTypes = {
  setTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const mapStateToProps = createSelector(
  makeSelectTheme(),
  theme => ({
    theme,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    setTheme: theme => dispatch(setTheme(theme)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemeSwitch);
