import moment from 'moment';
import numbro from 'numbro';
import { toast } from 'react-toastify';

import {
  checkMobile,
  formatWithNumbro,
  getCachedLang,
  injectTranslationValues,
  naturalCompare,
  registerNumbroLanguages,
  runGenerator,
  setMomentLanguage,
  setNumbroLanguage,
  showErrorToast,
  sort,
  toType,
  toUnixTimestamp,
  translate,
  waitForFonts,
} from '../common';
import {
  initialDateTimestamp,
  REACT_TOASTIFY_AUTO_CLOSE_DELAY,
} from '../../constants';
import { LOCAL_LANG } from '../../containers/App/constants';

describe('utils.common', () => {
  it('should check if device is mobile', () => {
    expect(checkMobile()).toBe(undefined);
  });

  it('should format usual numbers in more comfort readable ones', () => {
    expect(formatWithNumbro(0.01)).toBe('0');
    expect(formatWithNumbro(0.1)).toBe('0');
    expect(formatWithNumbro(1)).toBe('1');
    expect(formatWithNumbro(10)).toBe('10');
    expect(formatWithNumbro(100)).toBe('100');
    expect(formatWithNumbro(1000)).toBe('1,000');
    expect(formatWithNumbro(10000)).toBe('10,000');
    expect(formatWithNumbro(100000)).toBe('100,000');
    expect(formatWithNumbro(1000000)).toBe('1,000,000');
  });

  it('should get cached language', () => {
    const locale = 'fr';

    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');

    localStorage.clear();
    localStorage.setItem(LOCAL_LANG, locale);

    getCachedLang();

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem(LOCAL_LANG)).toBe(locale);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(LOCAL_LANG, locale);
  });

  it('should convert string and object values to readable string', () => {
    expect(
      injectTranslationValues('String with {field}', {
        field: 'value',
      }),
    ).toBe('String with value');
    expect(
      injectTranslationValues('String with {field1} and {field2}', {
        field1: 'value1',
        field2: 'value2',
      }),
    ).toBe('String with value1 and value2');
    expect(injectTranslationValues('String with {field}', {})).toBe(
      'String with {field}',
    );
    expect(injectTranslationValues('String with {field}', undefined)).toBe(
      'String with {field}',
    );
    expect(injectTranslationValues(undefined, {})).toBe(undefined);
  });

  it('should return the difference between two values', () => {
    expect(naturalCompare(2, 1)).toBe(1);
    expect(naturalCompare(1, 2)).toBe(-1);
    expect(naturalCompare(0, 0)).toBe(0);
    expect(naturalCompare(1, undefined)).toBe(-Infinity);
    expect(naturalCompare(undefined, undefined)).toBe(0);
  });

  it('should register languages using numbro library', () => {
    const numbroRegisterLanguage = jest.spyOn(numbro, 'registerLanguage');

    registerNumbroLanguages();
    expect(numbroRegisterLanguage).toHaveBeenCalled();
  });

  it('should run a given generator inside resolved Promise', () => {
    const promiseResolve = jest.spyOn(Promise, 'resolve');
    function* generatorFunction() {
      yield 1;
      yield 2;
    }

    const generator = generatorFunction();
    const generatorYield1 = generator.next().value;
    const generatorYield2 = generator.next().value;

    runGenerator(generatorFunction);

    expect(generatorYield1).toBe(1);
    expect(generatorYield2).toBe(2);
    expect(promiseResolve).toHaveBeenCalled();
  });

  it('should set locale using moment library', () => {
    const momentLocale = jest.spyOn(moment, 'locale');

    setMomentLanguage('en');
    expect(momentLocale).toHaveBeenCalled();
  });

  it('should set a language using numbro library', () => {
    const numbroSetLanguage = jest.spyOn(numbro, 'setLanguage');

    setNumbroLanguage('en');
    expect(numbroSetLanguage).toHaveBeenCalled();
  });

  it('should show error toast', () => {
    const toastError = jest.spyOn(toast, 'error');

    showErrorToast('some error');
    expect(toastError).toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith('some error', {
      autoClose: REACT_TOASTIFY_AUTO_CLOSE_DELAY,
    });
  });

  it('should return either boolean or the difference between two values', () => {
    expect(sort(1, 0)).toBe(1);
    expect(sort(0, '1')).toBe(-1);
    expect(sort('0', '1')).toBe(false);
    expect(sort('5', 1)).toBe(true);
    expect(sort(undefined, undefined)).toBe(false);
  });

  it('should return type of object', () => {
    expect(toType('someString')).toBe('string');
    expect(toType(1)).toBe('number');
    expect(toType(0)).toBe('number');
    expect(toType(-1)).toBe('number');
    expect(toType(NaN)).toBe('number');
    expect(toType(Infinity)).toBe('number');
    expect(toType([])).toBe('array');
    expect(toType({})).toBe('object');
    expect(toType(undefined)).toBe('undefined');
    expect(toType(null)).toBe('null');
    expect(toType(true)).toBe('boolean');
    expect(toType(false)).toBe('boolean');
    expect(toType(() => {})).toBe('function');
  });

  it('should return a translated string by id', () => {
    const yes = 'common.yes';

    localStorage.clear();
    localStorage.setItem(LOCAL_LANG, 'en');

    expect(translate(yes)).toBe('Yes');
  });

  it('should convert a valid date to unix timestamp', () => {
    expect(toUnixTimestamp('1970-01-01')).toBe(0);
    expect(toUnixTimestamp('2017-07-24T11:32:27.000')).toBe(1500885147000);
    expect(toUnixTimestamp()).toBe(initialDateTimestamp);
  });

  it('should wait for fonts being loaded', () => {
    expect(waitForFonts()).toBe(undefined);
  });
});
