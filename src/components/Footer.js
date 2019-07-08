import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;

  p {
    font-size: 0.825rem;
    margin: 0;
  }
`;

const Footer = () => (
  <StyledFooter>
    <p>TapTile v0.1 | Created by Zsolt Meszaros</p>
  </StyledFooter>
);

export default Footer;
