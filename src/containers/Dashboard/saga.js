import axios from 'axios';
import { all, call, takeLatest, put } from 'redux-saga/effects';

import appConstants from './constants';
import { EMPTY_ARRAY } from '../../constants/app';
import { showErrorToast } from '../../utils/common';
import { updateRandomBannerProducts, setError } from './actions';

function* fetchBannerAsync(action) {
  try {
    const amountRandomProducts = action.amountRandomProducts.number;

    yield put(setError(''));

    const request = () =>
      axios.get('http://www.teamcofounder.com/api/v1/mednet/bannerProducts');
    const response = yield call(request);

    const shuffled = response.data.sort(() => 0.5 - Math.random());
    const randomItems = shuffled.slice(0, amountRandomProducts);

    yield put(updateRandomBannerProducts(randomItems));
  } catch (error) {
    yield put(updateRandomBannerProducts(EMPTY_ARRAY));
    yield put(setError('Error: Random Products Banner data loading failed.'));

    return showErrorToast({
      id: 'errors.randomProductsBanner.dataLoadingFailed',
    });
  }
}

export default function* watchAppActions() {
  yield all([takeLatest(appConstants.FETCH_BANNER, fetchBannerAsync)]);
}
