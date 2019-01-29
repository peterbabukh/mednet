import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../../Modal';
import { OverlayMessage as NotConnectedOverlayMessage } from '../OverlayMessage';
import { overlayMessagePropsMock } from './mocks';

describe('components.OverlayMessage.OverlayMessage', () => {
  it('should render <OverlayMessage />', () => {
    const renderedComponent = shallow(
      <NotConnectedOverlayMessage {...overlayMessagePropsMock} />,
    );

    expect(renderedComponent.find(Modal).length).toBe(1);
  });
});
