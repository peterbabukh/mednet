import { fromJS } from 'immutable';

import { appLocales, DEFAULT_LOCALE } from '../../i18n';
import appConstants from './constants';
import {
  registerNumbroLanguages,
  setNumbroLanguage,
  setMomentLanguage,
} from '../../utils/common';

export const cachedLang = localStorage.getItem(appConstants.LOCAL_LANG);
export const navigatorLang = navigator.language || navigator.languages[0];

export const themeMap = {
  [appConstants.DEFAULT_THEME]: appConstants.DEFAULT_THEME,
  [appConstants.DARK_THEME]: appConstants.DARK_THEME,
};

const userLangByNavigator = appLocales.find(lang =>
  navigatorLang.startsWith(lang),
);

const activeLanguage = cachedLang || userLangByNavigator || DEFAULT_LOCALE;
registerNumbroLanguages();
setNumbroLanguage(activeLanguage);
setMomentLanguage(activeLanguage);

const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: '',
  userData: {},
  locale: activeLanguage,
  theme: appConstants.DEFAULT_THEME,
  unsavedData: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case appConstants.CHANGE_LOCALE:
      return state.set('locale', action.locale);

    case appConstants.SET_ERROR:
      return state.set('error', action.error);

    case appConstants.SET_CURRENT_USER:
      return state.set('currentUser', action.currentUser);

    case appConstants.SET_THEME:
      return state.set(
        'theme',
        themeMap[action.theme] || themeMap[appConstants.DEFAULT_THEME],
      );

    case appConstants.SET_UNSAVED_DATA: {
      const { key, value } = action;
      const unsavedData = state.get('unsavedData');
      const hasEntry = unsavedData.get(key);

      if (!hasEntry && value) {
        return state.setIn(
          ['unsavedData'],
          unsavedData.concat({ [key]: value }),
        );
      }

      return value
        ? state.updateIn(['unsavedData', key], () => value)
        : state.deleteIn(['unsavedData', key]);
    }

    case appConstants.SET_UNSAVED_DATA_FROM_DB:
      return state.set('unsavedData', fromJS(action.payload));

    default:
      return state;
  }
}

export default appReducer;
