import React from 'react';
import { shallow } from 'enzyme';

import { Select as SelectWithoutIntl } from '../Select';
import { selectPropsMock } from './mocks';

describe('components.Select.Select', () => {
  it('should render <Select />', () => {
    const renderedComponent = shallow(
      <SelectWithoutIntl {...selectPropsMock} />,
    );

    expect(renderedComponent.find('.select-container').length).toBe(1);
  });
});
