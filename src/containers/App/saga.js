import { all, select, takeLatest } from 'redux-saga/effects';

import getDB from '../../containers/Database/index';

import { APP_COLLECTION, USER_COLLECTION } from '../Database/constants';
import { APP_NAME } from '../../constants';
import appConstants from './constants';
import { makeSelectCurrentUser } from './selectors';
import {
  setMomentLanguage,
  setNumbroLanguage,
  showErrorToast,
} from '../../utils/common';

export function* updateCurrentUserInDb() {
  try {
    const db = yield getDB();
    const currentUser = yield select(makeSelectCurrentUser());

    const appDataToSave = {
      name: APP_NAME,
      currentUser,
    };

    yield db[APP_COLLECTION].atomicUpsert(appDataToSave).then(doc =>
      doc.save(),
    );
  } catch (error) {
    return showErrorToast({ id: 'errors.db.dataNotHandledByClientDb' });
  }
}

export function* saveUserDataToDb(userData) {
  const { userName, userPassword } = userData;

  try {
    const db = yield getDB();
    const userDataToSave = {
      user: userName,
      userData: { userName, userPassword },
    };

    const userDoc = yield db[USER_COLLECTION].find({ user: userName })
      .exec()
      .then(docs => docs[0])
      .catch(e => {
        throw new Error(e);
      });

    if (!userDoc) {
      return yield db[USER_COLLECTION].atomicUpsert(userDataToSave).then(doc =>
        doc.save(),
      );
    } else {
      const updatedDoc = yield userDoc
        .update({
          $set: {
            userData: Object.assign(
              {},
              { ...userDoc.userData },
              { userName },
              { userPassword },
            ),
          },
        })
        .then(doc => doc)
        .catch(e => {
          throw new Error(e);
        });

      yield updatedDoc.save();
    }
  } catch (error) {
    return showErrorToast({ id: 'errors.db.dataNotHandledByClientDb' });
  }
}

export const updateLocale = ({ locale }) => {
  localStorage.setItem(appConstants.LOCAL_LANG, locale);
  setNumbroLanguage(locale);
  setMomentLanguage(locale);
};

export function* setTheme(action) {
  try {
    const db = yield getDB();
    const currentUser = yield select(makeSelectCurrentUser());

    const userDoc = yield db[USER_COLLECTION].find({ user: currentUser })
      .exec()
      .then(docs => docs[0])
      .catch(e => {
        throw new Error(e);
      });

    if (userDoc) {
      const updatedDoc = yield userDoc
        .update({
          $set: {
            userData: Object.assign({}, userDoc.userData, {
              theme: action.theme,
            }),
          },
        })
        .then(doc => doc)
        .catch(e => {
          throw new Error(e);
        });

      yield updatedDoc.save();
    }
  } catch (error) {
    return showErrorToast({ id: 'errors.db.dataNotHandledByClientDb' });
  }
}

export function* saveUnsavedDataToDb(action) {
  const { key, value } = action;
  try {
    const db = yield getDB();
    const currentUser = yield select(makeSelectCurrentUser());

    const userDoc = yield db[USER_COLLECTION].find({ user: currentUser })
      .exec()
      .then(docs => docs[0])
      .catch(e => {
        throw new Error(e);
      });

    const operationType = value ? '$set' : '$unset';

    const updatedDoc = yield userDoc
      .update({
        [operationType]: {
          [`unsavedData.${key}`]: value ? value.toJS() : '',
        },
      })
      .then(doc => doc)
      .catch(e => {
        throw new Error(e);
      });
    yield updatedDoc.save();
  } catch (error) {
    return showErrorToast({ id: 'errors.db.dataNotHandledByClientDb' });
  }
}

export default function* watchAppActions() {
  yield all([
    takeLatest(appConstants.CHANGE_LOCALE, updateLocale),
    takeLatest(appConstants.SET_CURRENT_USER, updateCurrentUserInDb),
    takeLatest(appConstants.SAVE_USER_DATA_TO_DB, saveUserDataToDb),
    takeLatest(appConstants.SET_THEME, setTheme),
    takeLatest(appConstants.SET_UNSAVED_DATA, saveUnsavedDataToDb),
  ]);
}
