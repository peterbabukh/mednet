import app from './app';
import dashboard from '../dashboard/en';
import randomProductsBanner from '../randomProductsBanner/en';

const combinedTranslations = {
  ...app,
  ...dashboard,
  ...randomProductsBanner,
};

export default combinedTranslations;
