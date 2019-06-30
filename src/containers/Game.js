import React, { Component } from 'react';
import random from 'utils.random';

import Tile from './Tile';
import './Game.css';

const MAX_ACTIVE_TILES = 4;
const NUMBER_OF_CLICKS = [1, 1, 1, 1, 1, 1, 1, 1, 3, 5];
const POINTS_PER_CORRECT = 5;
const INITIAL_TILES = {
  0: { isActive: false, clicksRemaining: 0 },
  1: { isActive: false, clicksRemaining: 0 },
  2: { isActive: false, clicksRemaining: 0 },
  3: { isActive: false, clicksRemaining: 0 },
  4: { isActive: false, clicksRemaining: 0 },
  5: { isActive: false, clicksRemaining: 0 },
  6: { isActive: false, clicksRemaining: 0 },
  7: { isActive: false, clicksRemaining: 0 },
  8: { isActive: false, clicksRemaining: 0 },
  9: { isActive: false, clicksRemaining: 0 },
  10: { isActive: false, clicksRemaining: 0 },
  11: { isActive: false, clicksRemaining: 0 },
  12: { isActive: false, clicksRemaining: 0 },
  13: { isActive: false, clicksRemaining: 0 },
  14: { isActive: false, clicksRemaining: 0 },
  15: { isActive: false, clicksRemaining: 0 },
};

export class Game extends Component {
  state = {
    highestScore: 0,
    isRunning: false,
    score: 0,
    tiles: INITIAL_TILES,
  };

  componentWillUnmount() {
    window.clearInterval(this.intervalID);
  }

  startGame = () => {
    this.activateTile();
    this.setState({
      isRunning: true,
      score: 0,
    });

    this.intervalID = window.setInterval(() => {
      if (this.activeTiles() < MAX_ACTIVE_TILES) {
        this.activateTile();
      }
    }, 1000);
  };

  gameOver = () => {
    alert('Game over');

    window.clearInterval(this.intervalID);

    this.setState(state => ({
      highestScore:
        state.score > state.highestScore
          ? state.score
          : state.highestScore,
      isRunning: false,
      tiles: { ...INITIAL_TILES },
    }));
  };

  activateTile = id => {
    const tileId = id ? id : random(15);

    if (!id && this.activeTiles() >= MAX_ACTIVE_TILES) {
      return;
    }

    this.setState(state => ({
      tiles: {
        ...state.tiles,
        [tileId]: {
          ...state.tiles[tileId],
          isActive: true,
        },
      },
    }));
  };

  deactivateTile = id => {
    this.setState(state => ({
      tiles: {
        ...state.tiles,
        [id]: {
          ...state.tiles[id],
          isActive: false,
        },
      },
    }));
  };

  activeTiles = () => {
    const { tiles } = this.state;
    const countActive = (acc, curr) =>
      tiles[curr].isActive ? acc + 1 : acc;

    return Object.keys(tiles).reduce(countActive, 0);
  };

  handleClick = i => {
    const tile = this.state.tiles[i];

    if (!tile.isActive) {
      return this.gameOver();
    }

    this.activateTile();

    this.setState(state => {
      const tile = { ...state.tiles[i] };

      tile.isActive = tile.clicksRemaining > 1 ? true : false;
      tile.clicksRemaining =
        tile.clicksRemaining > 1
          ? tile.clicksRemaining - 1
          : random(NUMBER_OF_CLICKS);

      return {
        score: state.score + POINTS_PER_CORRECT,
        tiles: {
          ...state.tiles,
          [i]: tile,
        },
      };
    });
  };

  handleTimeout = i => {
    this.deactivateTile(i);
    this.activateTile();
  };

  renderTiles = () => {
    return Object.keys(this.state.tiles).map(i => {
      const tile = this.state.tiles[i];

      return (
        <Tile
          key={i}
          clicksRemaining={tile.clicksRemaining}
          id={i}
          isActive={tile.isActive}
          onClick={this.handleClick}
          onTimeout={this.handleTimeout}
        />
      );
    });
  };

  render() {
    return (
      <div className="container">
        <div className="board">{this.renderTiles()}</div>
        <div className="score">Score: {this.state.score}</div>
        {!this.state.isRunning && (
          <button onClick={this.startGame}>Start Game</button>
        )}
        <div>{this.activeTiles()}</div>
      </div>
    );
  }
}

export default Game;
