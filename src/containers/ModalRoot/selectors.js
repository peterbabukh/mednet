import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectModalState = state => state.get('modal') || initialState;

const makeSelectModalComponent = () =>
  createSelector(
    selectModalState,
    modalState => modalState.get('component'),
  );

const makeSelectModalParams = () =>
  createSelector(
    selectModalState,
    modalState => modalState.get('params'),
  );

export { selectModalState, makeSelectModalComponent, makeSelectModalParams };
