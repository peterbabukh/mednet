export const eventMock = {
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  target: {
    value: '1',
  },
};

export const storeMock = {
  dispatch: () => {},
  subscribe: () => {},
  getState: () => {},
  replaceReducer: () => {},
  runSaga: () => {},
  injectedReducers: {},
  injectedSagas: {},
};

export default { storeMock, eventMock };
