import app from './app';
import dashboard from '../dashboard/ru';
import randomProductsBanner from '../randomProductsBanner/ru';

const combinedTranslations = {
  ...app,
  ...dashboard,
  ...randomProductsBanner,
};

export default combinedTranslations;
