import styled from 'styled-components/macro';

export const ModalText = styled.div`
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.25;
  margin-bottom: 1rem;
  text-align: center;

  p {
    margin: 0 0 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 3rem;
  font-weight: 300;
  line-height: 1;
  margin: 0 0 1rem;

  @media (min-width: 420px) {
    margin-bottom: 2rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 1.1875rem);
  margin: auto;
  max-width: 800px;
  width: 100%;
`;
