import createHistory from 'history/createMemoryHistory';
import configureStore from '../../configureStore';

import { errorInterceptor } from '../axiosInterceptors';
import { SET_ERROR } from '../../containers/App/constants';

const history = createHistory();

describe('utils.axiosInterceptors', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, history);
  });

  it('should define errorInterceptor', () => {
    const axiosErrorInterceptor = errorInterceptor(store.dispatch);
    expect(axiosErrorInterceptor).toBeDefined();
  });

  it('should reject on noConnection error', () => {
    const promiseReject = jest.spyOn(Promise, 'reject');
    const axiosErrorInterceptor = errorInterceptor(store.dispatch);
    const errorMock = {
      response: 'error',
    };
    const expectedResult = 'error';
    axiosErrorInterceptor(errorMock).catch(jest.fn());
    expect(promiseReject).toBeCalledWith(expectedResult);
  });

  it('should reject if __CANCEL__ in error', () => {
    const promiseReject = jest.spyOn(Promise, 'reject');
    const axiosErrorInterceptor = errorInterceptor(store.dispatch);
    const errorMock = Object.setPrototypeOf({}, { __CANCEL__: true });
    axiosErrorInterceptor(errorMock).catch(jest.fn());
    expect(promiseReject).toBeCalledWith(errorMock);
  });

  it('should dispatch noConnection error', () => {
    store.dispatch = jest.fn();
    const axiosErrorInterceptor = errorInterceptor(store.dispatch);
    const dispatch = jest.spyOn(store, 'dispatch');
    const errorMock = { error: 'error' };
    const noConnectionActionMock = {
      type: SET_ERROR,
      error: {
        id: 'errors.noConnection',
        defaultMessage: 'No connection with the server.',
      },
    };

    axiosErrorInterceptor(errorMock).catch(jest.fn());
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith(noConnectionActionMock);
  });
});
