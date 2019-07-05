import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';
import validate from '../validate';
import { input } from '../../../../../../../components/formFields/';
import { formNames } from '../../../../../../../constants';
import { happyUserFormSettings } from '../constants';

const WizardFormSecondPage = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__container">
        <b>{<FormattedMessage {...messages.introAboutUserInfo} />}</b>
      </div>
      <Field
        name={`${formNames.firstName}`}
        type="text"
        component={input}
        label={<FormattedMessage {...messages.firstName} />}
        className="form__input"
      />
      <Field
        name={`${formNames.lastName}`}
        type="text"
        component={input}
        label={<FormattedMessage {...messages.lastName} />}
        className="form__input"
      />
      <div className="form__container">
        <button type="submit" className="form__btn-next">
          {<FormattedMessage {...messages.btnNext} />}
        </button>
      </div>
    </form>
  );
};

WizardFormSecondPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  ...happyUserFormSettings,
  validate,
})(WizardFormSecondPage);
