import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
  * {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  body {
    background-color: #f2f5f9;
    color: #363636;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    font-weight: 300;
    line-height: 1.5;
    margin: 0;
  }

  button {
    cursor: pointer;
  }

  a:focus,
  button:focus {
    outline: thin dotted;
  }
`;
