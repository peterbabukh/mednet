import appConstants from './constants';

export const setError = error => ({
  type: appConstants.SET_ERROR,
  error,
});

export const changeLocale = locale => ({
  type: appConstants.CHANGE_LOCALE,
  locale,
});

export const setCurrentUser = payload => ({
  type: appConstants.SET_CURRENT_USER,
  ...payload,
});

export const saveUserDataToDB = payload => ({
  type: appConstants.SAVE_USER_DATA_TO_DB,
  ...payload,
});

export const setTheme = theme => ({
  type: appConstants.SET_THEME,
  theme,
});

export const setUnsavedData = payload => ({
  type: appConstants.SET_UNSAVED_DATA,
  ...payload,
});

export const setUnsavedDataFromDB = payload => ({
  type: appConstants.SET_UNSAVED_DATA_FROM_DB,
  payload,
});

export default {
  setError,
  changeLocale,
  setCurrentUser,
  saveUserDataToDB,
  setTheme,
  setUnsavedData,
  setUnsavedDataFromDB,
};
