import { CHANGE_LOCALE, LOCAL_LANG } from '../constants';

import { changeLocale } from '../actions';
import { updateLocale } from '../saga';

describe('containers.App.actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        locale: 'de',
      };
      expect(changeLocale('de')).toEqual(expected);
    });
  });

  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        locale: 'de',
      };
      expect(changeLocale('de')).toEqual(expected);
    });

    it('changes the localStorage', () => {
      const locale = 'ru';

      jest.spyOn(Storage.prototype, 'setItem');
      jest.spyOn(Storage.prototype, 'getItem');

      localStorage.clear();

      updateLocale({ locale });

      expect(localStorage.setItem).toHaveBeenLastCalledWith(LOCAL_LANG, locale);
      expect(localStorage.getItem(LOCAL_LANG)).toBe(locale);
    });
  });
});
