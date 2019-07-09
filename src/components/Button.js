import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledButton = styled.button.attrs(props => ({
  type: props.type ? props.type : 'button',
}))`
  background-color: ${props =>
    props.primary ? '#46b980' : '#363636'};
  border: 0;
  border-radius: 0.25rem;
  color: ${props => (props.primary ? 'inherit' : '#fff')};
  font-size: 1.5rem;
  max-width: 12rem;
  padding: 0.75rem 1rem;
  user-select: none;
  width: 100%;

  &:focus {
    outline: thin dotted;
  }
`;

const Button = ({ children, className, onClick, ...props }) => (
  <StyledButton className={className} onClick={onClick} {...props}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
