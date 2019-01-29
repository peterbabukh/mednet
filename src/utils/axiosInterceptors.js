import { setError } from '../containers/App/actions';

export const errorInterceptor = dispatch => error => {
  const errorPrototype = Object.getPrototypeOf(error);

  if (errorPrototype && errorPrototype.__CANCEL__) {
    return Promise.reject(error);
  }

  if (!error.response) {
    const noConnectionError = {
      id: 'errors.noConnection',
      defaultMessage: 'No connection with the server.',
    };
    dispatch(setError(noConnectionError));
  }

  /*
   * Add your interceptors here.
   */

  return Promise.reject(error.response);
};

export const responseInterceptor = response => Promise.resolve(response);
