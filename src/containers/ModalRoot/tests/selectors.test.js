import { fromJS } from 'immutable';

import {
  makeSelectModalComponent,
  makeSelectModalParams,
  selectModalState,
} from '../selectors';

describe('containers.ModalRoot.selectors', () => {
  describe('makeSelectModalComponent', () => {
    it('should select component', () => {
      const currentComponent = makeSelectModalComponent();
      const component = 'component';
      const mockedState = fromJS({
        modal: {
          component,
        },
      });

      expect(currentComponent(mockedState)).toBe(component);
    });
  });

  describe('makeSelectModalParams', () => {
    it('should select params', () => {
      const currentParams = makeSelectModalParams();
      const params = fromJS({});
      const mockedState = fromJS({
        modal: {
          params,
        },
      });

      expect(currentParams(mockedState)).toBe(params);
    });
  });

  describe('selectModalState', () => {
    it('should select the Modal state', () => {
      const modalState = fromJS({});
      const mockedState = fromJS({
        modal: modalState,
      });

      expect(selectModalState(mockedState)).toEqual(modalState);
    });
  });
});
