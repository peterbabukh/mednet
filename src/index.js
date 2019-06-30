import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import browserUpdate from 'browser-update';
import createHistory from 'history/createHashHistory';
import { animateScroll as scroll } from 'react-scroll';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './containers/App';
import configureStore from './configureStore';
import getDB from './containers/Database';
import LanguageProvider from './containers/LanguageProvider';
import registerServiceWorker, { unregister } from './registerServiceWorker';

import {
  APP_COLLECTION,
  USER_COLLECTION,
} from './containers/Database/constants';
import {
  APP_NAME,
  browserUpdateOptions,
  reactScrollOptions,
  ROOT_NODE,
} from './constants';
import { DEFAULT_THEME } from './containers/App/constants';
import { checkMobile, runGenerator, waitForFonts } from './utils/common';
import {
  setCurrentUser,
  setTheme,
  setUnsavedDataFromDB,
} from './containers/App/actions';
import { translationMessages } from './i18n';

import './index.scss';

checkMobile();
waitForFonts();

const initialState = {};
const history = createHistory({
  hashType: 'noslash',
  basename: '/',
});

history.listen(() => {
  scroll.scrollToTop(reactScrollOptions);
});

const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById(ROOT_NODE);

browserUpdate(browserUpdateOptions);

function* updateUserAuthorization() {
  const db = yield getDB();
  const currentUserName = yield db[APP_COLLECTION].findOne(APP_NAME)
    .exec()
    .then(appData => appData && appData.currentUser);

  if (currentUserName) {
    const currentUserData = yield db[USER_COLLECTION].findOne(currentUserName)
      .exec()
      .then(data => data);

    const userData = currentUserData && currentUserData.userData;
    const unsavedData = currentUserData && currentUserData.unsavedData;

    yield store.dispatch(
      setCurrentUser({
        currentUser: currentUserName,
      }),
    );
    yield store.dispatch(setTheme(userData.theme || DEFAULT_THEME));
    yield store.dispatch(setUnsavedDataFromDB(unsavedData || {}));
  }
}

(async function init() {
  await runGenerator(updateUserAuthorization);

  const render = messages => {
    ReactDOM.render(
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
      MOUNT_NODE,
    );
  };

  if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', './containers/App'], () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render(translationMessages);
    });
  }

  // Chunked polyfill for browsers without Intl support
  if (!window.Intl) {
    new Promise(resolve => {
      resolve(import('intl'));
    })
      .then(() =>
        Promise.all([
          import('intl/locale-data/jsonp/en.js'),
          import('intl/locale-data/jsonp/ru.js'),
        ]),
      )
      .then(() => render(translationMessages))
      .catch(err => {
        throw err;
      });
  } else {
    render(translationMessages);
  }

  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker();
  } else {
    unregister();
  }
})();
