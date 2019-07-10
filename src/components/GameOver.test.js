import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Button from './Button';
import GameOver from './GameOver';
import { ModalText } from './Common.style';

describe('<GameOver />', () => {
  it('displays score and high score correctly', () => {
    const highScore = 429;
    const score = 57;
    const wrapper = shallow(
      <GameOver
        highScore={highScore}
        onStart={f => f}
        score={score}
      />
    );

    expect(wrapper.find(ModalText).render()).toMatchSnapshot();
  });

  it('calls onStart on click', () => {
    const onStart = jest.fn();
    const wrapper = shallow(
      <GameOver highScore={0} onStart={onStart} score={0} />
    );
    wrapper.find(Button).simulate('click');

    expect(onStart).toBeCalledTimes(1);
  });
});
