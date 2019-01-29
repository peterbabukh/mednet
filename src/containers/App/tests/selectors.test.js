import { fromJS } from 'immutable';

import {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserData,
} from '../selectors';
import { DEFAULT_USER_NAME } from '../constants';

describe('containers.App.selectors', () => {
  describe('selectGlobal', () => {
    it('should select the global state', () => {
      const globalState = fromJS({});
      const mockedState = fromJS({
        global: globalState,
      });
      expect(selectGlobal(mockedState)).toEqual(globalState);
    });
  });

  describe('makeSelectCurrentUser', () => {
    const currentUserSelector = makeSelectCurrentUser();
    it('should select the current user', () => {
      const username = 'MedNet';
      const mockedState = fromJS({
        global: {
          currentUser: username,
        },
      });
      expect(currentUserSelector(mockedState)).toEqual(username);
    });
  });

  describe('makeSelectLoading', () => {
    const loadingSelector = makeSelectLoading();
    it('should select the loading', () => {
      const loading = false;
      const mockedState = fromJS({
        global: {
          loading,
        },
      });
      expect(loadingSelector(mockedState)).toEqual(loading);
    });
  });

  describe('makeSelectError', () => {
    const errorSelector = makeSelectError();
    it('should select the error', () => {
      const error = 404;
      const mockedState = fromJS({
        global: {
          error,
        },
      });
      expect(errorSelector(mockedState)).toEqual(error);
    });
  });

  describe('makeSelectUserData', () => {
    const DataSelector = makeSelectUserData();
    it('should select the data', () => {
      const data = fromJS({ userName: DEFAULT_USER_NAME });
      const mockedState = fromJS({
        global: {
          userData: {
            userName: DEFAULT_USER_NAME,
          },
        },
      });
      expect(DataSelector(mockedState)).toEqual(data);
    });
  });
});
