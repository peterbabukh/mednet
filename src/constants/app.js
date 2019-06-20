import { default as immutable } from 'immutable';
import PropTypes from 'prop-types';

export const APP_NAME = 'MedNet';
export const ROOT_NODE = 'root';

export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};
export const DEFAULT_FUNC = () => {};

export const OVERLAY_MESSAGE_COMPONENT = 'OVERLAY_MESSAGE_COMPONENT';

export const REACT_TOASTIFY_AUTO_CLOSE_DELAY = 5000;

export const reactScrollOptions = {
  duration: 0,
  delay: 0,
};

export const iterablePropTypes = PropTypes.oneOfType([
  PropTypes.instanceOf(Array),
  PropTypes.instanceOf(immutable.Iterable),
]).isRequired;

export const browserUpdateOptions = {
  required: {
    e: -1,
    f: -3,
    o: -3,
    o_a: -3,
    s: -3,
    c: -3,
    y: -3,
    v: -3,
    uc: -3,
    samsung: -3,
  },
};

export const initialDateTimestamp = 0;
