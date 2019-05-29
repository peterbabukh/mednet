import { fromJS } from 'immutable';

import appReducer, { navigatorLang } from '../reducer';
import { changeLocale } from '../actions';
import { DEFAULT_THEME } from '../constants';

describe('containers.App.reducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentUser: '',
      userData: fromJS({
        role: 'customer',
        authorized: false,
        healthProblems: fromJS({}),
      }),
      locale: 'en',
      theme: DEFAULT_THEME,
      unsavedData: fromJS({}),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('changes the locale', () => {
    const locale = 'de';
    const expectedResult = state.set('locale', locale);

    expect(appReducer(state, changeLocale(locale))).toEqual(expectedResult);
  });

  describe('navigatorLang', () => {
    it('should get navigatorLang', () => {
      expect(navigatorLang).toBeDefined();
    });
  });
});
