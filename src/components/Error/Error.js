import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './Error.scss';

class Error extends React.PureComponent {
  renderError(error, index = 0) {
    return (
      <span
        className="error-component__message"
        key={`error-component-${index}`}
      >
        {typeof error === 'string' ? error : <FormattedMessage {...error} />}
      </span>
    );
  }

  render() {
    const { error } = this.props;
    if (!error) return null;

    return (
      <div className="error-component">
        {Array.isArray(error)
          ? error.map((err, index) => this.renderError(err, index))
          : this.renderError(error)}
      </div>
    );
  }
}

Error.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
};

export default Error;
