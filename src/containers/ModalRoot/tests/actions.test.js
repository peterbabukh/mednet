import {
  HIDE_OVERLAY_MODAL,
  SET_AND_SHOW_OVERLAY_MESSAGE,
  SET_OVERLAY_MESSAGE,
  SHOW_OVERLAY_MODAL,
} from '../constants';

import { OVERLAY_MESSAGE_COMPONENT } from '../../../constants';

import {
  hideOverlayModal,
  setAndShowOverlayMessage,
  setOverlayMessage,
  showOverlayModal,
} from '../actions';

describe('containers.ModalRoot.actions', () => {
  describe('hideOverlayModal', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: HIDE_OVERLAY_MODAL,
        component: null,
      };

      expect(hideOverlayModal()).toEqual(expectedResult);
    });
  });

  describe('setAndShowOverlayMessage', () => {
    it('should return the correct type', () => {
      const params = {};
      const expectedResult = {
        type: SET_AND_SHOW_OVERLAY_MESSAGE,
        component: {
          type: OVERLAY_MESSAGE_COMPONENT,
          id: '',
        },
        params,
      };

      expect(setAndShowOverlayMessage(params)).toEqual(expectedResult);
    });
  });

  describe('setOverlayMessage', () => {
    it('should return the correct type', () => {
      const message = 'message';
      const expectedResult = {
        type: SET_OVERLAY_MESSAGE,
        component: null,
        message,
      };

      expect(setOverlayMessage(message)).toEqual(expectedResult);
    });
  });

  describe('showOverlayModal', () => {
    it('should return the correct type', () => {
      const component = 'component';
      const expectedResult = {
        type: SHOW_OVERLAY_MODAL,
        component,
      };

      expect(showOverlayModal(component)).toEqual(expectedResult);
    });
  });
});
