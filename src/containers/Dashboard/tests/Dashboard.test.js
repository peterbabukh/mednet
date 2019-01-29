import React from 'react';

import Dashboard from '../Dashboard';
import Helmet from '../../../components/HelmetIntl';

import {
  mountWithRouterWithIntl,
  withProviderAndIntl,
} from '../../../../config/helpers/intl-enzyme-test-helper';
import { translationMessages } from '../../../i18n';

describe('containers.Dashboard.Dashboard', () => {
  it('should render <Dashboard />', () => {
    const renderedComponent = mountWithRouterWithIntl(
      withProviderAndIntl(<Dashboard />, {
        translationMessages,
      }),
    );
    expect(renderedComponent.find('.dashboard').length).toEqual(1);
  });

  it('should render the <Helmet /> in the <Dashboard />', () => {
    const renderedComponent = mountWithRouterWithIntl(
      withProviderAndIntl(<Dashboard />, {
        translationMessages,
      }),
    );
    expect(renderedComponent.find(Helmet).length).toEqual(1);
  });
});
