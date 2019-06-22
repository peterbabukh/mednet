import React, { PureComponent } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getFormValues, getFormSyncErrors } from 'redux-form/immutable';

import {
  loginOrRegisterApiUrl,
  editUserProfileApiUrl,
} from '../../../../../../config';
import {
  showErrorToast,
  showSuccessToast,
  showInfoToast,
} from '../../../../../../utils/common';
import { HAPPY_USER_FORM } from './constants';

import {
  LoginOrRegister,
  WizardFormSecondPage,
  WizardFormThirdPage,
  WizardFormFourthPage,
  WizardFormFifthPage,
  WizardFormSixthPage,
  WizardFormSeventhPage,
  WizardFormEighthPage,
} from './WizardFormPages';

import './WizardForm.css';

// {showResults} to display form results
// TODO: remove after connecting DB
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function showResults(values) {
  await sleep(500);
  window.alert(
    `HappyUserWizardForm submitted:\n\n${JSON.stringify(values, null, 4)}`,
  );
}

class WizardForm extends PureComponent {
  state = {
    page: 1,
  };

  updateUserData = () => {
    const { formValues } = this.props;

    if (this.state.page !== 1 && formValues) {
      const formValuesToJs = formValues.toJS();

      if (formValuesToJs.email) {
        delete formValuesToJs.password;
        delete formValuesToJs.passwordRepeat;

        const userData = { ...formValuesToJs };
        delete userData.email;

        axios.put(editUserProfileApiUrl, {
          email: formValuesToJs.email,
          data: { userData },
        });
      }
    }
  };

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });

    this.updateUserData();
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  onRegister = event => {
    const { formValues, formErrors } = this.props;

    if (!formValues) {
      event.preventDefault();
      event.stopPropagation();

      return showInfoToast({
        id: 'errors.formRegistrationEmpty',
      });
    }

    if (formErrors.size === 0) {
      const formValuesToJs = formValues.toJS();

      axios
        .post(loginOrRegisterApiUrl, {
          email: formValuesToJs.email,
          password: formValuesToJs.password,
          data: { employee: false },
        })
        .then(function() {
          return showSuccessToast({
            id: 'form.text.RegistrationComplete',
          });
        })
        .catch(function() {
          return showErrorToast({
            id: 'errors.formNotSubmitted',
          });
        });
    }
  };

  render() {
    const { page } = this.state;

    return (
      <div className="wizard-form">
        {page === 1 && (
          <LoginOrRegister
            onRegister={this.onRegister}
            onSubmit={this.nextPage}
          />
        )}
        {page === 2 && (
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 4 && (
          <WizardFormFourthPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 5 && (
          <WizardFormFifthPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 6 && (
          <WizardFormSixthPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 7 && (
          <WizardFormSeventhPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 8 && (
          <WizardFormEighthPage
            previousPage={this.previousPage}
            // onSubmit={onSubmit}
            onSubmit={showResults}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formValues: getFormValues(HAPPY_USER_FORM),
  formErrors: getFormSyncErrors(HAPPY_USER_FORM),
});

WizardForm.propTypes = {
  formValues: PropTypes.object,
  formErrors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(WizardForm);
