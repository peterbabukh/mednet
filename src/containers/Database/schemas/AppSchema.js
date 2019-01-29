import { APP_NAME } from '../../../constants';

const schema = {
  disableKeyCompression: true,
  title: 'appSchema',
  description: '',
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true,
      default: APP_NAME,
    },
    currentUser: {
      type: 'string',
    },
    token: {
      type: 'string',
    },
  },
  required: [],
};

export default schema;
