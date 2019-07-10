import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Button from './Button';
import Logo from '../icons/Logo';
import { ModalText, Title } from './Common.style';

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
        </p>
        <p>
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

GameOver.propTypes = {
  highScore: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default GameOver;
