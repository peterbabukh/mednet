const env = process.env.NODE_ENV || 'development';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

let baseUrl;
if (env === 'development') {
  baseUrl = BASE_URL;
} else if (env === 'test') {
  baseUrl = BASE_URL;
} else if (env === 'staging') {
  baseUrl = BASE_URL;
} else if (env === 'production') {
  baseUrl = BASE_URL;
} else {
  baseUrl = BASE_URL;
}

export const ApiBaseUrl = 'http://www.teamcofounder.com/api/v1/mednet';

export const loginOrRegisterApiUrl = `${ApiBaseUrl}/loginOrRegister`;
export const editUserProfileApiUrl = `${ApiBaseUrl}/editUserProfile`;
export const getBannerProductsApiUrl = `${ApiBaseUrl}/bannerProducts`;

export default {
  baseUrl,
  loginOrRegisterApiUrl,
  editUserProfileApiUrl,
  getBannerProductsApiUrl,
};
