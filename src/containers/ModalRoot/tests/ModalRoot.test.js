import React from 'react';
import { shallow } from 'enzyme';

import { ModalRoot as NotConnectedModalRoot } from '../ModalRoot';
import { MODAL_ROOT } from '../constants';

describe('containers.ModalRoot.ModalRoot', () => {
  it('should render <ModalRoot />', () => {
    const renderedComponent = shallow(<NotConnectedModalRoot />);

    expect(renderedComponent.find(`#${MODAL_ROOT}`).length).toBe(1);
  });
});
