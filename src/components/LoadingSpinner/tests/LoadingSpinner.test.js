import React from 'react';
import { shallow } from 'enzyme';

import LoadingSpinner from '../LoadingSpinner';
import { LOADING_SPINNER_SIZES } from '../constants';

describe('components.LoadingSpinner.LoadingSpinner', () => {
  it('should render <LoadingSpinner />', () => {
    const renderedComponent = shallow(<LoadingSpinner />);

    expect(renderedComponent.find('.loading-spinner').length).toBe(1);
  });

  it('should render <LoadingSpinner /> with given size', () => {
    const { small } = LOADING_SPINNER_SIZES;
    const renderedComponent = shallow(<LoadingSpinner size={small} />);

    expect(renderedComponent.hasClass(small)).toBe(true);
  });

  it('should render <LoadingSpinner /> with custom className', () => {
    const className = 'whatever';
    const renderedComponent = shallow(<LoadingSpinner className={className} />);

    expect(renderedComponent.hasClass(className)).toBe(true);
  });
});
