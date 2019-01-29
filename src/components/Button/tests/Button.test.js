import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';
import { BUTTON_VARIANTS } from '../constants';

describe('components.Button.Button', () => {
  const { primary, transparent } = BUTTON_VARIANTS;

  it('should render a default <Button />', () => {
    const renderedComponent = shallow(<Button />);

    expect(renderedComponent.find('button').length).toBe(1);
  });

  it('should render a <Button /> with custom className', () => {
    const className = 'className';
    const renderedComponent = shallow(<Button className={className} />);

    expect(renderedComponent.find(`.${className}`).length).toBe(1);
  });

  it('should render a <Button /> with string as a child', () => {
    const text = 'text';
    const renderedComponent = shallow(<Button text={text} />);

    expect(renderedComponent.text()).toBe(text);
  });

  it('should render a <Button /> with HTMLElement as a child', () => {
    const Child = () => <div />;
    const renderedComponent = shallow(
      <Button>
        <Child />
      </Button>,
    );

    expect(renderedComponent.find(Child).length).toBe(1);
  });

  it('should render a <Button /> with one variant as a className', () => {
    const variant = primary;
    const renderedComponent = shallow(<Button variant={variant} />);

    expect(renderedComponent.find(`.${variant}`).length).toBe(1);
  });

  it('should render a <Button /> with two variants as a className', () => {
    const variant = [primary, transparent];
    const selector = `.${variant.join('.')}`;
    const renderedComponent = shallow(<Button variant={variant} />);

    expect(renderedComponent.find(selector).length).toBe(1);
  });
});
