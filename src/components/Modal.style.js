import styled from 'styled-components/macro';
import { DialogContent, DialogOverlay } from '@reach/dialog';

export const Content = styled(DialogContent)`
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 420px;
  outline: none;
  padding: 2rem 1rem;
  position: relative;
  width: 90%;
`;

export const Overlay = styled(DialogOverlay)`
  background-color: #46b980; /* hsl(150, 45%, 50%); */
  bottom: 0;
  display: flex;
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
`;
