import {
  SHOW_OVERLAY_MODAL,
  HIDE_OVERLAY_MODAL,
  SET_OVERLAY_MESSAGE,
  SET_AND_SHOW_OVERLAY_MESSAGE,
} from './constants';

import { OVERLAY_MESSAGE_COMPONENT } from '../../constants';

function showOverlayModal(component) {
  return {
    type: SHOW_OVERLAY_MODAL,
    component,
  };
}

function hideOverlayModal() {
  return {
    type: HIDE_OVERLAY_MODAL,
    component: null,
  };
}

function setOverlayMessage(message) {
  return {
    type: SET_OVERLAY_MESSAGE,
    component: null,
    message,
  };
}

function setAndShowOverlayMessage(params) {
  return {
    type: SET_AND_SHOW_OVERLAY_MESSAGE,
    component: {
      type: OVERLAY_MESSAGE_COMPONENT,
      id: '',
    },
    params,
  };
}

export {
  showOverlayModal,
  hideOverlayModal,
  setOverlayMessage,
  setAndShowOverlayMessage,
};
