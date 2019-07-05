import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';
import validate from '../validate';
import { formNames } from '../../../../../../../constants';
import { input } from '../../../../../../../components/formFields/';
import { happyUserFormSettings } from '../constants';

const LoginOrRegister = props => {
  const { handleSubmit, onRegister } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__container">
        <b>{<FormattedMessage {...messages.wantToRegister} />}</b>
      </div>
      <Field
        name={`${formNames.email}`}
        type="text"
        component={input}
        label={<FormattedMessage {...messages.email} />}
        className="form__input"
      />
      <Field
        name={`${formNames.password}`}
        type="password"
        component={input}
        label={<FormattedMessage {...messages.password} />}
        className="form__input"
      />
      <Field
        name={`${formNames.passwordRepeat}`}
        type="password"
        component={input}
        label={<FormattedMessage {...messages.passwordRepeat} />}
        className="form__input"
      />
      <div className="form__container">
        {<FormattedMessage {...messages.registrationBonuses} />}
        <i className="form__question-circle far fa-question-circle"></i>
      </div>
      <div className="form__container">
        <button
          type="submit"
          onClick={onRegister}
          className="form__btn-register"
        >
          {<FormattedMessage {...messages.btnOkRegisterMe} />}
        </button>
        <button type="submit" className="form__btn-next">
          {<FormattedMessage {...messages.btnNoLater} />}
        </button>
      </div>
    </form>
  );
};

LoginOrRegister.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default reduxForm({
  ...happyUserFormSettings,
  validate,
})(LoginOrRegister);
