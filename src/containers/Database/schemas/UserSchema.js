const schema = {
  disableKeyCompression: true,
  title: 'userSchema',
  description: '',
  version: 0,
  type: 'object',
  properties: {
    user: {
      type: 'string',
      primary: true,
    },
    userData: {},
    unsavedData: {},
  },
  required: [],
};

export default schema;
