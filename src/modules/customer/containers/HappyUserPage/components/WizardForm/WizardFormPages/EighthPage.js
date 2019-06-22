import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';
import validate from '../validate';
import { formNames } from '../../../../../../../constants';
import { happyUserFormSettings } from '../constants';

const WizardFormEighthPage = props => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__container">
        <label className="form__label" htmlFor={`form.${formNames.notes}`}>
          {<FormattedMessage {...messages.notes} />}
        </label>
        <div className="form__container-input">
          <Field
            id={`form.${formNames.notes}`}
            name={`${formNames.notes}`}
            component="textarea"
            className="form__textarea"
          />
        </div>
      </div>
      <div className="form__container">
        <button type="button" className="form__btn-prev" onClick={previousPage}>
          {<FormattedMessage {...messages.btnPrevious} />}
        </button>
        <button className="form__btn-submit" type="submit">
          {<FormattedMessage {...messages.btnSubmit} />}
        </button>
      </div>
    </form>
  );
};

WizardFormEighthPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  ...happyUserFormSettings,
  validate,
})(WizardFormEighthPage);
