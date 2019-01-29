import React from 'react';
import { shallow } from 'enzyme';

import { Modal as NotConnectedModal } from '../Modal';

describe('components.Modal.Modal', () => {
  it('should render <Modal />', () => {
    const renderedComponent = shallow(<NotConnectedModal />);

    expect(renderedComponent.find('.modal-overlay').length).toBe(1);
  });
});
