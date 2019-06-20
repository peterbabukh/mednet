import appConstants from './constants';

export const updateRandomBannerProducts = randomProducts => {
  return {
    type: appConstants.UPDATE_RANDOM_BANNER_PRODUCTS,
    randomProducts,
  };
};

export const setError = error => ({
  type: appConstants.SET_ERROR,
  error,
});

export const fetchBanner = amountRandomProducts => ({
  type: appConstants.FETCH_BANNER,
  amountRandomProducts,
});

export default {
  updateRandomBannerProducts,
  setError,
  fetchBanner,
};
