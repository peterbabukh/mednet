import React from 'react';
import { shallow } from 'enzyme';

import Select from '../../Select';
import { ThemeSwitch as NotConnectedThemeSwitch } from '../ThemeSwitch';

import { themeSwitchPropsMock } from './mocks';

describe('components.ThemeSwitch.ThemeSwitch', () => {
  it('should render <ThemeSwitch />', () => {
    const renderedComponent = shallow(
      <NotConnectedThemeSwitch {...themeSwitchPropsMock} />,
    );

    expect(renderedComponent.find(Select).length).toBe(1);
    expect(renderedComponent.find('.theme-switch').length).toBe(1);
  });
});
