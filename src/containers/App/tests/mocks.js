import { DEFAULT_THEME } from '../constants';

const appPropsMock = {
  isAuthorized: true,
  dispatch: jest.fn(),
  theme: DEFAULT_THEME,
};
const noAuthAppPropsMock = Object.assign({}, appPropsMock, {
  isAuthorized: false,
});

export { appPropsMock, noAuthAppPropsMock };
