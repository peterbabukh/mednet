import reducer from '../reducer';

import { initialState } from '../reducer';
import {
  hideOverlayModal,
  setAndShowOverlayMessage,
  setOverlayMessage,
  showOverlayModal,
} from '../actions';
import { OVERLAY_MESSAGE_COMPONENT } from '../../../constants';

describe('containers.ModalRoot.reducer', () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    const expectedResult = state;

    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the hideOverlayModal action correctly', () => {
    const expectedResult = state.set('component', null);

    expect(reducer(state, hideOverlayModal())).toEqual(expectedResult);
  });

  it('should handle the setAndShowOverlayMessage action correctly', () => {
    const component = { type: OVERLAY_MESSAGE_COMPONENT, id: '' };
    const params = {};
    const expectedResult = state
      .set('component', component)
      .set('params', params);

    expect(reducer(state, setAndShowOverlayMessage(params))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setOverlayMessage action correctly', () => {
    const expectedResult = state
      .set('component', null)
      .set('params', undefined);

    expect(reducer(state, setOverlayMessage('message'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the showOverlayModal action correctly', () => {
    const component = 'component';
    const expectedResult = state.set('component', component);

    expect(reducer(state, showOverlayModal(component))).toEqual(expectedResult);
  });
});
