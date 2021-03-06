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
import {
  formNames,
  healthProblemsListMap,
} from '../../../../../../../constants';
import { happyUserFormSettings } from '../constants';

const WizardFormSixthPage = props => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="form__container">
          <label className="form__label">
            {<FormattedMessage {...messages.father} />}
          </label>
        </div>
        <Field
          name={`${formNames.father}[${formNames.age}]`}
          type="number"
          component={input}
          label={<FormattedMessage {...messages.age} />}
          className="form__input"
        />
        <Field
          name={`${formNames.father}[${formNames.weight}]`}
          type="number"
          component={input}
          label={<FormattedMessage {...messages.weight} />}
          className="form__input"
        />
        <Field
          name={`${formNames.father}[${formNames.healthProblems}]`}
          component={CheckboxGroup}
          options={healthProblemsListMap}
          label={<FormattedMessage {...messages.healthProblems} />}
        />
        <div className="form__container">
          <button
            type="button"
            className="form__btn-prev"
            onClick={previousPage}
          >
            {<FormattedMessage {...messages.btnPrevious} />}
          </button>
          <button type="submit" className="form__btn-next">
            {<FormattedMessage {...messages.btnNext} />}
          </button>
        </div>
      </div>
    </form>
  );
};

WizardFormSixthPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  ...happyUserFormSettings,
  validate,
})(WizardFormSixthPage);
