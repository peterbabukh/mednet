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

const WizardFormFifthPage = props => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="form__container">
          <label className="form__label">
            {<FormattedMessage {...messages.child} />}
          </label>
        </div>
        <div className="form__container">
          <label className="form__label">
            {<FormattedMessage {...messages.sex} />}
          </label>
          <div className="form__container-input">
            <label>
              <Field
                name={`${formNames.child}[${formNames.sex}]`}
                component="input"
                type="radio"
                value="male"
              />{' '}
              {<FormattedMessage {...messages.male} />}
            </label>
            <label>
              <Field
                name={`${formNames.child}[${formNames.sex}]`}
                component="input"
                type="radio"
                value="female"
              />{' '}
              {<FormattedMessage {...messages.female} />}
            </label>
          </div>
        </div>
        <Field
          name={`${formNames.child}[${formNames.age}]`}
          type="number"
          component={input}
          label={<FormattedMessage {...messages.age} />}
          className="wizard-form__input"
        />
        <Field
          name={`${formNames.child}[${formNames.wight}]`}
          type="number"
          component={input}
          label={<FormattedMessage {...messages.weight} />}
          className="form__input"
        />
        <Field
          name={`${formNames.child}[${formNames.healthProblems}]`}
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

WizardFormFifthPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  ...happyUserFormSettings,
  validate,
})(WizardFormFifthPage);
