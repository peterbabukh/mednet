import app from './app';
import dashboard from './dashboard';
import randomProductsBanner from './randomProductsBanner';

const combinedTranslations = {
  ...app,
  ...dashboard,
  ...randomProductsBanner,
};

export default combinedTranslations;
