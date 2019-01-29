import { fromJS } from 'immutable';

import {
  SHOW_OVERLAY_MODAL,
  HIDE_OVERLAY_MODAL,
  SET_OVERLAY_MESSAGE,
  SET_AND_SHOW_OVERLAY_MESSAGE,
} from './constants';

export const initialState = fromJS({
  component: null,
  params: {},
});

function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_OVERLAY_MODAL:
    case HIDE_OVERLAY_MODAL:
      return state.set('component', action.component);
    case SET_OVERLAY_MESSAGE:
    case SET_AND_SHOW_OVERLAY_MESSAGE:
      return state
        .set('component', action.component)
        .set('params', action.params);
    default:
      return state;
  }
}

export default modal;
