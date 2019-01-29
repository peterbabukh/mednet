import React from 'react';
import createHistory from 'history/createMemoryHistory';
import { Switch } from 'react-router-dom';

import configureStore from '../../../configureStore';
import Header from '../../Header';
import Helmet from '../../../components/HelmetIntl';
import Footer from '../../Footer';

import { App, AppComponent } from '../App';
import { appPropsMock } from './mocks';
import {
  mountWithRouterWithIntl,
  shallowWithRouterWithIntl,
  withProviderAndIntl,
} from '../../../../config/helpers/intl-enzyme-test-helper.js';
import { translationMessages } from '../../../i18n';

const history = createHistory();

describe('containers.App.App', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, history);
  });

  it('should render <App />', () => {
    const renderedComponent = mountWithRouterWithIntl(
      withProviderAndIntl(<App {...appPropsMock} />, { translationMessages }),
    );
    expect(renderedComponent.contains(<App {...appPropsMock} />)).toBe(true);
  });

  it('should render the <Switch /> in the <App />', () => {
    const renderedComponent = mountWithRouterWithIntl(
      <App {...appPropsMock} store={store} />,
    );
    expect(renderedComponent.find(Switch).length).toEqual(1);
  });

  it('should render the <Helmet /> in the <App />', () => {
    const renderedComponent = mountWithRouterWithIntl(
      <App {...appPropsMock} store={store} />,
    );
    expect(renderedComponent.find(Helmet).length).toEqual(1);
  });

  it('should render the <Header /> in the <AppComponent />', () => {
    const renderedComponent = shallowWithRouterWithIntl(<AppComponent />);
    expect(renderedComponent.find(Header).length).toEqual(1);
  });

  it('should render the <Footer /> in the <AppComponent />', () => {
    const renderedComponent = shallowWithRouterWithIntl(<AppComponent />);
    expect(renderedComponent.find(Footer).length).toEqual(1);
  });

  it('should render the main block in the <AppComponent />', () => {
    const renderedComponent = shallowWithRouterWithIntl(<AppComponent />);
    expect(renderedComponent.find('.main').length).toEqual(1);
  });
});
