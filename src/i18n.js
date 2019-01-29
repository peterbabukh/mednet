/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */

import enTranslationMessages from './translations/en';
import ruTranslationMessages from './translations/ru';

const addLocaleData = require('react-intl').addLocaleData;
const enLocaleData = require('react-intl/locale-data/en');
const ruLocaleData = require('react-intl/locale-data/ru');

addLocaleData(enLocaleData);
addLocaleData(ruLocaleData);

export const DEFAULT_LOCALE = 'en';

// prettier-ignore
export const appLocales = [
  'en',
  'ru'
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  ru: formatTranslationMessages('ru', ruTranslationMessages),
};
