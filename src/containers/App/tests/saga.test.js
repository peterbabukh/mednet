import createHistory from 'history/createMemoryHistory';
import { toast } from 'react-toastify';

import configureStore from '../../../configureStore';
import getDB from '../../Database';

import { setCurrentUser } from '../actions';
import { updateCurrentUserInDb } from '../saga';

const history = createHistory();

describe('containers.App.saga', () => {
  const toastError = jest.spyOn(toast, 'error');
  let store;
  let state;

  beforeAll(() => {
    store = configureStore({}, history);
  });

  describe('updateCurrentUserInDb', () => {
    it('should updateCurrentUserInDb', async () => {
      let result;
      const currentUserMock = 'test';
      store.dispatch(setCurrentUser({ currentUser: currentUserMock }));
      state = store.getState();

      const generator = updateCurrentUserInDb();
      const db = await getDB();

      generator.next();

      result = generator.next(db);
      expect(result.value.SELECT.selector).toBeDefined();
      const currentUser = result.value.SELECT.selector(state);
      expect(currentUser).toEqual(currentUserMock);

      result = generator.next();
      expect(result.value).toBeTruthy();
    });

    it('should show error if updateCurrentUserInDb fails', () => {
      const generator = updateCurrentUserInDb();
      generator.next();
      generator.throw({
        error: 'Error',
      });
      expect(toastError).toHaveBeenCalled();
    });
  });
});
