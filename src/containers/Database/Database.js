import * as RxDB from 'rxdb';
// import { QueryChangeDetector } from 'rxdb';

import { APP_COLLECTION, USER_COLLECTION } from './constants';

// QueryChangeDetector.enable();

if (process.env.NODE_ENV === 'development') {
  // QueryChangeDetector.enableDebugging();
}

if (process.env.NODE_ENV === 'test') {
  RxDB.plugin(require('pouchdb-adapter-memory'));
} else {
  RxDB.plugin(require('pouchdb-adapter-idb'));
}

const collections = [
  {
    name: APP_COLLECTION,
    schema: require('./schemas/AppSchema.js').default,
    methods: {},
    sync: false,
  },
  {
    name: USER_COLLECTION,
    schema: require('./schemas/UserSchema.js').default,
    methods: {},
    sync: false,
  },
];

let dbPromise = null;

const _create = async function() {
  const db = await RxDB.create({
    name: 'mednet',
    adapter: process.env.NODE_ENV === 'test' ? 'memory' : 'idb',
    password: process.env.DB_PASSWORD,
    multiInstance: true,
    ignoreDuplicate: true,
  });

  if (process.env.NODE_ENV === 'development') {
    window['db'] = db;
  }

  db.waitForLeadership().then(() => {});

  await Promise.all(collections.map(colData => db.collection(colData))).catch(
    e => e,
  );

  return db;
};

const getDB = () => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};

export default getDB;
