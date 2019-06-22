import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { formNames } from '../../../../../../constants';

const validate = values => {
  const errors = {};
  const valuesToJs = values.toJS();

  if (
    valuesToJs[formNames.email] ||
    valuesToJs[formNames.password] ||
    valuesToJs[formNames.passwordRepeat]
  ) {
    if (!valuesToJs[formNames.email]) {
      errors.email = <FormattedMessage {...messages.required} />;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        valuesToJs[formNames.email],
      )
    ) {
      errors.email = <FormattedMessage {...messages.invalidEmail} />;
    }

    if (!valuesToJs[formNames.password]) {
      errors.password = <FormattedMessage {...messages.required} />;
    }

    if (valuesToJs[formNames.password]) {
      if (!valuesToJs[formNames.passwordRepeat]) {
        errors.passwordRepeat = <FormattedMessage {...messages.required} />;
      } else if (
        valuesToJs[formNames.password] !== valuesToJs[formNames.passwordRepeat]
      ) {
        errors.passwordRepeat = (
          <FormattedMessage {...messages.passwordsDoNotMatch} />
        );
      }
    }
  }

  return errors;
};

export default validate;
