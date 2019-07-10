import React from 'react';
import { render, shallow } from 'enzyme';
import 'jest-styled-components';

import Tile, { StyledTile } from './Tile';

describe('<Tile />', () => {
  it('renders button with remaining time and clicks left', () => {
    const wrapper = render(
      <Tile
        clicksRemaining={5}
        id="id"
        isActive
        onClick={f => f}
        onTimeout={f => f}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders button with remaining time if only one click is left', () => {
    const wrapper = render(
      <Tile
        clicksRemaining={1}
        id="id"
        isActive
        onClick={f => f}
        onTimeout={f => f}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders button with the correct remaining time after 2.5 seconds', () => {
    jest.useFakeTimers();
    const timePassed = 2500;
    const expectedTimeRemaining = 3000;
    const expectedSeconds = '3';
    const wrapper = shallow(
      <Tile
        clicksRemaining={1}
        id="id"
        isActive
        onClick={f => f}
        onTimeout={f => f}
      />
    );

    expect(wrapper.state('timeRemaining')).toBe(5000);

    wrapper.instance().startTimer();
    jest.advanceTimersByTime(timePassed);
    expect(wrapper.state('timeRemaining')).toBe(
      expectedTimeRemaining
    );

    expect(
      wrapper
        .render()
        .find('div')
        .last()
        .text()
    ).toBe(expectedSeconds);
  });

  it('renders empty button if inactive', () => {
    const wrapper = render(
      <Tile id="id" onClick={f => f} onTimeout={f => f} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('calls onClick on button click', () => {
    const handleClick = jest.fn();
    const tileId = 'test id';
    const timeRemaining = 5000;

    const wrapper = shallow(
      <Tile id={tileId} onClick={handleClick} onTimeout={f => f} />
    );

    wrapper.find(StyledTile).simulate('click');

    expect(handleClick).toBeCalledTimes(1);
    expect(handleClick).toBeCalledWith(tileId, timeRemaining);
  });

  it('starts a timer if tile becomes active', () => {
    const wrapper = shallow(
      <Tile
        clicksRemaining={1}
        id="id"
        onClick={f => f}
        onTimeout={f => f}
      />
    );

    const startTimer = jest.spyOn(wrapper.instance(), 'startTimer');

    expect(startTimer).not.toBeCalled();

    wrapper.setProps({ isActive: true });
    expect(startTimer).toBeCalledTimes(1);
  });

  it('stops timer if tile becomes inactive', () => {
    const wrapper = shallow(
      <Tile
        clicksRemaining={1}
        id="id"
        isActive
        onClick={f => f}
        onTimeout={f => f}
      />
    );

    const stopTimer = jest.spyOn(wrapper.instance(), 'stopTimer');

    expect(stopTimer).not.toBeCalled();

    wrapper.setProps({ isActive: false });
    expect(stopTimer).toBeCalledTimes(1);
  });

  it('calls onTimeout after five seconds', () => {
    jest.useFakeTimers();
    const handleTimeout = jest.fn();
    const tileId = 'test id';
    const wrapper = shallow(
      <Tile
        clicksRemaining={1}
        id={tileId}
        isActive
        onClick={f => f}
        onTimeout={handleTimeout}
      />
    );

    expect(handleTimeout).not.toBeCalled();
    expect(wrapper.state('timeRemaining')).toBe(5000);

    wrapper.instance().startTimer();
    jest.advanceTimersByTime(2500);
    expect(wrapper.state('timeRemaining')).toBe(3000);

    jest.advanceTimersByTime(2500);
    expect(handleTimeout).toBeCalledTimes(1);
    expect(handleTimeout).toBeCalledWith(tileId);
  });
});
