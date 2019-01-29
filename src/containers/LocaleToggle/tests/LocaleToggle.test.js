import React from 'react';
import { shallow } from 'enzyme';

import LocaleToggle, {
  LocaleToggle as NotConnectedLocaleToggle,
  mapDispatchToProps,
} from '../LocaleToggle';

import { changeLocale } from '../../App/actions';
import {
  mountWithRouterWithIntl,
  withProviderAndIntl,
} from '../../../../config/helpers/intl-enzyme-test-helper';
import { translationMessages } from '../../../i18n';

describe('containers.LocaleToggle.LocaleToggle', () => {
  it('should render the default language messages', () => {
    const renderedComponent = shallow(
      withProviderAndIntl(<LocaleToggle />, { translationMessages }),
    );
    expect(renderedComponent.contains(<LocaleToggle />)).toBe(true);
  });

  it('should dispatch changeLocale when called', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    const locale = 'de';
    result.changeLocale(locale);
    expect(dispatch).toHaveBeenCalledWith(changeLocale(locale));
  });

  it('should render locale toggle', () => {
    const renderedComponent = mountWithRouterWithIntl(
      withProviderAndIntl(<LocaleToggle />, { translationMessages }),
    );
    expect(renderedComponent.find('.select-container').length).toEqual(1);
  });

  it('should have changeLocale defined', () => {
    const renderedComponent = shallow(<NotConnectedLocaleToggle />);
    const inst = renderedComponent.instance();
    expect(inst.changeLocale).toBeDefined();
    expect(inst.changeLocale('en')).toBeDefined();
  });

  describe('mapDispatchToProps', () => {
    describe('changeLocale', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.changeLocale).toBeDefined();
      });
    });
  });
});
