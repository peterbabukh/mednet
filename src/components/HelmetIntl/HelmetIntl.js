import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

class HelmetIntl extends React.PureComponent {
  render() {
    const {
      messages: { title, description },
      intl,
    } = this.props;

    return (
      <Helmet
        titleTemplate="%s"
        defaultTitle="MedNet"
        title={intl.formatMessage(title)}
        description={intl.formatMessage(description)}
      >
        <meta name="description" content={intl.formatMessage(description)} />
      </Helmet>
    );
  }
}

HelmetIntl.propTypes = {
  intl: intlShape.isRequired,
  messages: PropTypes.shape({
    title: PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default injectIntl(HelmetIntl);
