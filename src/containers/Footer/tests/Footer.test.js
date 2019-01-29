import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../Footer';

describe('containers.Footer.Footer', () => {
  it('should render <Footer />', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.find('.footer').length).toEqual(1);
  });
});
