import React from 'react';
import { mount, render, shallow } from 'enzyme';
import 'jest-styled-components';

import Button from './Button';

describe('<Button />', () => {
  it('matches snapshot', () => {
    const wrapper = render(
      <Button onClick={f => f}>
        <span aria-hidden={true}>Close</span>&times;
      </Button>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot if primary', () => {
    const wrapper = render(
      <Button onClick={f => f} primary>
        <span aria-hidden={true}>Close</span>&times;
      </Button>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('passes the className prop down', () => {
    const wrapper = mount(
      <Button className="your-class" onClick={f => f}>
        Start Test
      </Button>
    );

    expect(
      wrapper.find('button').hasClass('your-class')
    ).toBeTruthy();
  });

  it('calls the callback prop on click', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <Button onClick={handleClick}>Start Test</Button>
    );

    wrapper.simulate('click');

    expect(handleClick).toBeCalledTimes(1);
  });
});
