/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */
import createHistory from 'history/createMemoryHistory';
import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import {
  mountWrapWithRouter,
  shallowWrapWithRouter,
} from './router-wrapper-helper.js';

import configureStore from '../../src/configureStore';
import LanguageProvider from '../../src/containers/LanguageProvider';
import { translationMessages } from '../../src/i18n';

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider(
  { locale: 'en', translationMessages },
  {},
);
const { intl } = intlProvider.getChildContext();

const history = createHistory();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node, { context, ...additionalOptions } = {}) {
  return shallow(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    ...additionalOptions,
  });
}

export function mountWithIntl(
  node,
  { context, childContextTypes, ...additionalOptions } = {},
) {
  return mount(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    childContextTypes: Object.assign(
      {},
      { intl: intlShape },
      childContextTypes,
    ),
    ...additionalOptions,
  });
}

export function shallowWithRouterWithIntl(
  node,
  { context, ...additionalOptions } = {},
) {
  return shallowWrapWithRouter(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    ...additionalOptions,
  });
}

export function mountWithRouterWithIntl(
  node,
  { context, childContextTypes, ...additionalOptions } = {},
) {
  return mountWrapWithRouter(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    childContextTypes: Object.assign(
      {},
      { intl: intlShape },
      childContextTypes,
    ),
    ...additionalOptions,
  });
}

export function withProviderAndIntl(node, { translationMessages } = {}) {
  const store = configureStore({}, history);

  return (
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>{node}</LanguageProvider>
    </Provider>
  );
}
