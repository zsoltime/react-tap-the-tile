import React from 'react';
import { mount, render } from 'enzyme';
import 'jest-styled-components';

import Board from './Board';

describe('<Board />', () => {
  it('renders a list of buttons', () => {
    const tiles = [
      {
        clicksRemaining: 3,
        isActive: true,
      },
      {
        clicksRemaining: 0,
        isActive: false,
      },
      {
        clicksRemaining: 1,
        isActive: true,
      },
    ];
    const wrapper = render(
      <Board tiles={tiles} onClick={f => f} onTimeout={f => f} />
    );

    expect(wrapper.find('button').length).toBe(tiles.length);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes onClick prop to <Tile />', () => {
    const tiles = [
      {
        clicksRemaining: 1,
        isActive: true,
      },
      {
        clicksRemaining: 0,
        isActive: false,
      },
    ];
    const handleClick = jest.fn();
    const buttonId = 0;
    const timeRemaining = 5000;
    const wrapper = mount(
      <Board tiles={tiles} onClick={handleClick} onTimeout={f => f} />
    );

    wrapper
      .find('button')
      .first()
      .simulate('click');

    expect(handleClick).toBeCalledTimes(1);
    expect(handleClick).toBeCalledWith(buttonId, timeRemaining);
  });
});
