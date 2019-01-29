import React from 'react';
import { shallow } from 'enzyme';

import Error from '../Error';
import { errorPropsMock, errorNullPropsMock } from './mocks';

describe('components.Error.Error', () => {
  const errorComponentSelector = '.error-component';

  it('should render <Error /> which contains ".error-component"', () => {
    const renderedComponent = shallow(<Error {...errorPropsMock} />);

    expect(renderedComponent.find(errorComponentSelector).length).toBe(1);
    expect(
      renderedComponent.find('.error-component__message').length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('should render <Error /> which does not contain ".error-component"', () => {
    const renderedComponent = shallow(<Error {...errorNullPropsMock} />);

    expect(renderedComponent.find(errorComponentSelector).length).toBe(0);
  });
});
