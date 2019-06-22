import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from '../../modules/customer/containers/HappyUserPage/components/WizardForm/messages';

import './formFields.css';

class CheckboxGroup extends React.PureComponent {
  onChange = event => {
    const { input } = this.props;
    const { value } = event.target;
    const newValue = [...input.value];

    if (event.target.checked) {
      newValue.push(value);
    } else {
      newValue.splice(newValue.indexOf(value), 1);
    }
    return input.onChange(newValue);
  };

  checkboxGroup() {
    const { options, input } = this.props;

    return options
      .map((option, id) => {
        return (
          <div className="form__checkbox" key={`checkbox-group-option-${id}`}>
            <label>
              <input
                type="checkbox"
                name={`${input.name}[${id}]`}
                value={option.id}
                checked={input.value.includes(option.id)}
                onChange={this.onChange}
              />
              <FormattedMessage {...messages[id]} />
            </label>
          </div>
        );
      })
      .valueSeq();
  }

  render() {
    const { label } = this.props;
    return (
      <div className="form__container">
        <label className="form__label">{label}</label>
        <div className="form__container-checkbox">{this.checkboxGroup()}</div>
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.object,
  label: PropTypes.object,
};

export default CheckboxGroup;
