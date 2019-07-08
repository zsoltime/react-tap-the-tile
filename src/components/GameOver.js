import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import Logo from '../icons/Logo';
import { ModalText, Title } from './Common.style';

const Hr = styled.hr`
  border-color: hsla(325, 35%, 55%);
  border-style: dashed;
  border-width: 1px 0 0;
`;

const StyledLogo = styled(Logo)`
  margin-bottom: 1rem;
`;

const GameOver = ({ highScore, onStart, score }) => {
  return (
    <>
      <Title>Game Over</Title>
      <StyledLogo />
      <ModalText>
        <p>Oh noes! You tapped a white tile!</p>
        <p>
          <strong>Score: {score}</strong>
          <Hr />
          <strong>High Score: {highScore}</strong>
        </p>
        <p>Don't give up and try again.</p>
      </ModalText>
      <Button onClick={onStart} primary>
        New Game
      </Button>
    </>
  );
};

export default GameOver;
