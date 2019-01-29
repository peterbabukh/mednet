import React from 'react';
import { shallow } from 'enzyme';

import Header from '../Header';

describe('containers.Header.Header', () => {
  it('should render <Header />', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find('.header').length).toEqual(1);
  });
});
