import React from 'react';
import { shallow } from 'enzyme';

import Divider from '../Divider';

describe('components.Divider.Divider', () => {
  it('should render a default <Divider />', () => {
    const renderedComponent = shallow(<Divider />);

    expect(renderedComponent.find('.divider').length).toBe(1);
  });
});
