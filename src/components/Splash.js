import React from 'react';
import styled from 'styled-components/macro';

import Button from './Button';
import Logo from '../icons/Logo';
import { ModalText, Title } from './Common.style';

const BlackOnWhite = styled.strong`
  border: 1px solid #363636;
  padding: 2px 5px;
`;

const StyledLogo = styled(Logo)`
  margin-bottom: 1rem;
`;

const WhiteOnBlack = styled.strong`
  background-color: #363636;
  color: #fff;
  padding: 2px 5px;
`;

const Splash = ({ onStart }) => (
  <>
    <Title>Tap the Tile</Title>
    <StyledLogo />
    <ModalText>
      <p>
        Collect points by clicking on the{' '}
        <WhiteOnBlack>black</WhiteOnBlack> tiles before they fade out.
      </p>
      <p>
        Don't tap the <BlackOnWhite>white</BlackOnWhite> tiles.
      </p>
    </ModalText>
    <Button onClick={onStart} primary>
      New Game
    </Button>
  </>
);

export default Splash;
