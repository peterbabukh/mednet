import FontFaceObserver from 'fontfaceobserver';
import moment from 'moment';
import 'moment/locale/ru';
import numbro from 'numbro';
import numbroLanguages from 'numbro/dist/languages.min';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import { appLocales, DEFAULT_LOCALE, translationMessages } from '../i18n';
import { LOCAL_LANG } from '../containers/App/constants';
import { numbroLanguageMap } from './constants';
import {
  initialDateTimestamp,
  REACT_TOASTIFY_AUTO_CLOSE_DELAY,
} from '../constants';

export function registerNumbroLanguages() {
  numbro.registerLanguage(numbroLanguages['ru-RU']);
}

export function setNumbroLanguage(lang) {
  const numbroLang = appLocales.includes(lang) ? lang : DEFAULT_LOCALE;
  numbro.setLanguage(numbroLanguageMap[numbroLang]);
}

export function setMomentLanguage(lang) {
  moment.locale(lang);
}

export function naturalCompare(val1, val2) {
  const a = `${val1}`;
  const b = `${val2}`;

  let ax = [],
    bx = [];

  a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
    ax.push([$1 || Infinity, $2 || '']);
  });
  b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
    bx.push([$1 || Infinity, $2 || '']);
  });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

export function sort(a, b) {
  if (typeof a === 'number') {
    return a - b;
  } else {
    return `${a}`.toLowerCase() > `${b}`.toLowerCase();
  }
}

export function applySearch(searchData, searchField, searchString) {
  const searchLine = `${searchString}`;
  const searchStrings = searchLine
    ? searchLine
        .trim()
        .split(' ')
        .sort((a, b) => a < b)
    : [];

  return searchData.filter(v => {
    v = v ? `${v[searchField]}` : '';

    if (!v) {
      return false;
    } else {
      if (searchStrings.length) {
        for (let i = 0; i < searchStrings.length; i++) {
          if (!new RegExp(searchStrings[i], 'i').test(v)) {
            return false;
          } else {
            v = v.replace(
              new RegExp('\\S*' + searchStrings[i] + '\\S*', 'i'),
              '',
            );
          }
        }
        return true;
      } else {
        return true;
      }
    }
  });
}

export const multiFilter = (array, filters) => {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    return filterKeys.every(key => {
      return !!applySearch([item], key, filters[key]).length;
    });
  });
};

export function runGenerator(gen) {
  const args = [].slice.call(arguments, 1);
  const it = gen.apply(this, args);

  return Promise.resolve().then(function handleNext(value) {
    const next = it.next(value);

    return (function handleResult(next) {
      if (next.done) return next.value;
      else {
        return Promise.resolve(next.value).then(
          handleNext,
          function handleError(err) {
            return Promise.resolve(it.throw(err)).then(handleResult);
          },
        );
      }
    })(next);
  });
}

export const toType = obj => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
};

export const formatWithNumbro = value =>
  numbro(value).format({
    thousandSeparated: true,
    mantissa: 0,
  });

const errorToastIDs = Object.create(null);

export const showErrorToast = error => {
  const errorToShow =
    typeof error === 'string' ? error : <FormattedMessage {...error} />;

  const id = 'TOAST_ID';

  if (!toast.isActive(errorToastIDs[id])) {
    errorToastIDs[id] = toast.error(errorToShow, {
      autoClose: REACT_TOASTIFY_AUTO_CLOSE_DELAY,
    });
  }
};

const toastIDs = Object.create(null);

export const showSuccessToast = msg => {
  const message = typeof msg === 'string' ? msg : <FormattedMessage {...msg} />;

  const id = 'SUCCESS_TOAST_ID';

  if (!toast.isActive(toastIDs[id])) {
    toastIDs[id] = toast.success(message, {
      autoClose: REACT_TOASTIFY_AUTO_CLOSE_DELAY,
    });
  }
};

export const showInfoToast = msg => {
  const message = typeof msg === 'string' ? msg : <FormattedMessage {...msg} />;

  const id = 'INFO_TOAST_ID';

  if (!toast.isActive(toastIDs[id])) {
    toastIDs[id] = toast.info(message, {
      autoClose: REACT_TOASTIFY_AUTO_CLOSE_DELAY,
    });
  }
};

export const getCachedLang = () =>
  localStorage.getItem(LOCAL_LANG) || DEFAULT_LOCALE;

export const injectTranslationValues = (string, values) => {
  if (!string) return void 0;
  const regExp = /\{(.*?)\}/g;

  let match,
    stringWithValues = string;

  while ((match = regExp.exec(stringWithValues)) !== null) {
    const replacement = (values && values[match[1]]) || match[0];
    stringWithValues = stringWithValues.replace(match[0], replacement);
  }

  return stringWithValues;
};

export const translate = (intlId, values) => {
  const cachedLang = getCachedLang();
  const translation = translationMessages[cachedLang];
  if (translation && values) {
    return injectTranslationValues(translation[intlId], values);
  } else {
    return translation && translation[intlId];
  }
};

export const toUnixTimestamp = date => Date.parse(date) || initialDateTimestamp;

export const checkMobile = () => {
  if (!document || !navigator || !window) {
    return;
  }

  let isMobile = false;
  (function(param) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        param,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        param.substr(0, 4),
      )
    )
      isMobile = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  isMobile && document.body.classList.add('isMobile');
};

export const waitForFonts = () => {
  if (!document) {
    return;
  }

  const fontLoadObserver = new FontFaceObserver('Open Sans', {});
  fontLoadObserver.load().then(() => {
    document.body.classList.add('fontLoaded');
  });
};
