import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import globalReducer from './containers/App/reducer';
import dashboardReducer from './containers/Dashboard/reducer';
import { fromJS } from 'immutable';

const routeInitialState = fromJS({
  location: null,
});

export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    dashboard: dashboardReducer,
    form: formReducer,
    ...injectedReducers,
  });
}
