import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Button from './Button';
import Splash from './Splash';
import { ModalText } from './Common.style';

describe('<Splash />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Splash onStart={f => f} />);

    expect(wrapper.find(ModalText).render()).toMatchSnapshot();
  });

  it('calls onStart on click', () => {
    const onStart = jest.fn();
    const wrapper = shallow(<Splash onStart={onStart} />);
    wrapper.find(Button).simulate('click');

    expect(onStart).toBeCalledTimes(1);
  });
});
