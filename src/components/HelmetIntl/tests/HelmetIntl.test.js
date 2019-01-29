import React from 'react';

import HelmetIntl from '../HelmetIntl';
import messages from '../../../containers/Dashboard/messages';
import { shallowWithIntl } from '../../../../config/helpers/intl-enzyme-test-helper';

describe('components.HelmetIntl.HelmetIntl', () => {
  const helmetMessages = {
    title: messages.dashboardTitle,
    description: messages.dashboardDescription,
  };

  it('should render <HelmetIntl />', () => {
    const renderedComponent = shallowWithIntl(
      <HelmetIntl messages={helmetMessages} />,
    );

    expect(renderedComponent.exists()).toBe(true);
  });
});
