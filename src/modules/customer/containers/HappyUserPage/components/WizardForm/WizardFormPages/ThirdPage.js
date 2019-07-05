import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';
import validate from '../validate';
import {
  CheckboxGroup,
  input,
} from '../../../../../../../components/formFields/';
import { interestsListMap } from '../../../../../../../constants';
import { formNames } from '../../../../../../../constants';
import { happyUserFormSettings } from '../constants';

const WizardFormThirdPage = props => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name={`${formNames.country}`}
        type="text"
        component={input}
        label={<FormattedMessage {...messages.country} />}
        className="form__input"
      />
      <Field
        name={`${formNames.city}`}
        type="text"
        component={input}
        label={<FormattedMessage {...messages.city} />}
        className="form__input"
      />
      <Field
        name={`${formNames.interests}`}
        component={CheckboxGroup}
        options={interestsListMap}
        label={<FormattedMessage {...messages.interests} />}
      />
      <div className="form__container">
        <button type="button" className="form__btn-prev" onClick={previousPage}>
          {<FormattedMessage {...messages.btnPrevious} />}
        </button>
        <button type="submit" className="form__btn-next">
          {<FormattedMessage {...messages.btnNext} />}
        </button>
      </div>
    </form>
  );
};

WizardFormThirdPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  ...happyUserFormSettings,
  validate,
})(WizardFormThirdPage);
