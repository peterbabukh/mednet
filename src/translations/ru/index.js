import app from './app';
import dashboard from './dashboard';
import randomProductsBanner from './randomProductsBanner';
import form from './form';

const combinedTranslations = {
  ...app,
  ...dashboard,
  ...randomProductsBanner,
  ...form,
};

export default combinedTranslations;
