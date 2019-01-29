import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import PropTypes from 'prop-types';

// Instantiate router context
const router = {
  history: new MemoryRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = ({
  context,
  childContextTypes,
  ...additionalOptions
} = {}) => ({
  context: Object.assign({}, context, { router }),
  childContextTypes: Object.assign({}, childContextTypes, {
    router: PropTypes.shape({}),
  }),
  ...additionalOptions,
});

export function shallowWrapWithRouter(node, options = {}) {
  return shallow(node, createContext(options));
}

export function mountWrapWithRouter(node, options = {}) {
  return mount(node, createContext(options));
}
