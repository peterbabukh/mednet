import { createSelector } from 'reselect';

const selectDashboardState = state => state.get('dashboard');

const makeSelectProducts = () =>
  createSelector(
    selectDashboardState,
    dashboardState => {
      return dashboardState.get('randomProducts');
    },
  );

const makeSelectError = () =>
  createSelector(
    selectDashboardState,
    globalState => globalState.get('error'),
  );

export { selectDashboardState, makeSelectProducts, makeSelectError };
