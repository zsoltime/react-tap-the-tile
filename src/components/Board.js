import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Tile from '../containers/Tile';

const StyledBoard = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 20rem;
  justify-content: space-around;
  margin-bottom: 1rem;
  width: 20rem;

  @media (min-width: 420px) {
    height: 25rem;
    width: 25rem;
  }
`;

const Board = ({ tiles, onClick, onTimeout }) => (
  <StyledBoard>
    {tiles.map((tile, i) => (
      <Tile
        // TODO: Add ID to tiles
        key={i}
        clicksRemaining={tile.clicksRemaining}
        id={i}
        isActive={tile.isActive}
        onClick={onClick}
        onTimeout={onTimeout}
      />
    ))}
  </StyledBoard>
);

Board.propTypes = {
  onClick: PropTypes.func.isRequired,
  onTimeout: PropTypes.func.isRequired,
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      clicksRemaining: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
};

export default Board;
