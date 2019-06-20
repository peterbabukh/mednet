import { fromJS } from 'immutable';

import appConstants from './constants';
import { EMPTY_ARRAY } from '../../constants/app';

const initialState = fromJS({
  randomProducts: EMPTY_ARRAY,
  error: '',
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case appConstants.UPDATE_RANDOM_BANNER_PRODUCTS:
      return state.set('randomProducts', fromJS(action.randomProducts));

    case appConstants.SET_ERROR:
      return state.set('error', action.error);

    default:
      return state;
  }
}

export default dashboardReducer;
