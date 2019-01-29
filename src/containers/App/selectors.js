import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('currentUser'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('error'),
  );

const makeSelectUserData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('userData'),
  );

const makeSelectIsAuthorized = () =>
  createSelector(
    selectGlobal,
    globalState => !!globalState.get('currentUser'),
  );

const makeSelectLocale = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('locale'),
  );

const makeSelectTheme = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('theme'),
  );

const makeSelectUnsavedData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('unsavedData'),
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserData,
  makeSelectLocale,
  makeSelectIsAuthorized,
  makeSelectTheme,
  makeSelectUnsavedData,
};
