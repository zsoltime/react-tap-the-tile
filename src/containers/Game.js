import React, { Component } from 'react';
import random from 'utils.random';

import Board from '../components/Board';
import Button from '../components/Button';
import Footer from '../components/Footer';
import GameOver from '../components/GameOver';
import Splash from '../components/Splash';
import { Content, Overlay } from '../components/Modal.style';
import { Wrapper } from '../components/Common.style';

const MAX_ACTIVE_TILES = 5;
const NUMBER_OF_CLICKS = [1, 1, 1, 1, 1, 1, 1, 1, 3, 5];
const POINTS_PER_CORRECT = 5;
const INITIAL_TILES = {
  0: { clicksRemaining: 0, isActive: false },
  1: { clicksRemaining: 0, isActive: false },
  2: { clicksRemaining: 0, isActive: false },
  3: { clicksRemaining: 0, isActive: false },
  4: { clicksRemaining: 0, isActive: false },
  5: { clicksRemaining: 0, isActive: false },
  6: { clicksRemaining: 0, isActive: false },
  7: { clicksRemaining: 0, isActive: false },
  8: { clicksRemaining: 0, isActive: false },
  9: { clicksRemaining: 0, isActive: false },
  10: { clicksRemaining: 0, isActive: false },
  11: { clicksRemaining: 0, isActive: false },
  12: { clicksRemaining: 0, isActive: false },
  13: { clicksRemaining: 0, isActive: false },
  14: { clicksRemaining: 0, isActive: false },
  15: { clicksRemaining: 0, isActive: false },
};

export class Game extends Component {
  state = {
    highestScore: 0,
    isRunning: false,
    missedTiles: 0,
    score: 0,
    showGameOver: false,
    showSplash: true,
    tiles: { ...INITIAL_TILES },
  };

  componentWillUnmount() {
    window.clearInterval(this.intervalID);
  }

  activateTile = id => {
    const tileId = id ? id : this.getRandomTile();

    if (!id && this.activeTiles().length >= MAX_ACTIVE_TILES) {
      return;
    }

    this.setState(state => ({
      tiles: {
        ...state.tiles,
        [tileId]: {
          clicksRemaining: random(NUMBER_OF_CLICKS),
          isActive: true,
        },
      },
    }));
  };

  activeTiles = () => {
    const { tiles } = this.state;
    const filterActives = (filtered, curr) => {
      if (tiles[curr].isActive) {
        return [...filtered, { ...tiles[curr], id: curr }];
      }
      return filtered;
    };

    return Object.keys(tiles).reduce(filterActives, []);
  };

  deactivateTile = id => {
    this.setState(state => ({
      tiles: {
        ...state.tiles,
        [id]: {
          clicksRemaining: 0,
          isActive: false,
        },
      },
    }));
  };

  gameOver = () => {
    window.clearInterval(this.intervalID);

    this.setState(state => ({
      highestScore:
        state.score > state.highestScore
          ? state.score
          : state.highestScore,
      isRunning: false,
      showGameOver: true,
      tiles: { ...INITIAL_TILES },
    }));
  };

  getRandomTile = () => {
    const id = random(15);

    if (this.isAlreadyActive(id)) {
      return this.getRandomTile();
    }

    return id;
  };

  handleClick = (i, secs) => {
    const tile = this.state.tiles[i];
    const points = Math.ceil(secs / 1000);

    if (!tile.isActive) {
      return this.gameOver();
    }

    // activate a random tile
    this.activateTile();

    this.setState(state => {
      const tile = { ...state.tiles[i] };
      const moreClicksAvailable = tile.clicksRemaining > 1;

      tile.isActive = moreClicksAvailable ? true : false;
      tile.clicksRemaining = moreClicksAvailable
        ? tile.clicksRemaining - 1
        : 0;

      return {
        score: state.score + points,
        tiles: {
          ...state.tiles,
          [i]: tile,
        },
      };
    });
  };

  handleTimeout = i => {
    this.setState(state => ({
      missedTiles: state.missedTiles + state.tiles[i].clicksRemaining,
    }));
    this.deactivateTile(i);
    this.activateTile();
  };

  isAlreadyActive = id =>
    !!this.activeTiles().filter(tile => tile.id == id).length;

  resetGame = () => {
    this.setState({
      isRunning: true,
      missedTiles: 0,
      score: 0,
      showGameOver: false,
      showSplash: false,
      tiles: { ...INITIAL_TILES },
    });
  };

  startGame = () => {
    this.resetGame();
    this.activateTile();

    this.intervalID = window.setInterval(() => {
      if (this.activeTiles().length < MAX_ACTIVE_TILES) {
        this.activateTile();
      }
    }, 1000);
  };

  render() {
    return (
      <>
        <main>
          <Wrapper>
            <Board
              tiles={this.state.tiles}
              onClick={this.handleClick}
              onTimeout={this.handleTimeout}
            />
            {this.state.isRunning && (
              <Button
                primary
                onClick={() =>
                  alert('The game is paused, wowzers 😆')
                }
              >
                Pause Game
              </Button>
            )}
            <div className="score">
              Score: {this.state.score} | Missed:{' '}
              {this.state.missedTiles}
            </div>
          </Wrapper>

          <Overlay isOpen={this.state.showSplash}>
            <Content>
              <Splash onStart={this.startGame} />
            </Content>
          </Overlay>

          <Overlay isOpen={this.state.showGameOver}>
            <Content>
              <GameOver
                highScore={this.state.highestScore}
                onStart={this.startGame}
                score={this.state.score}
              />
            </Content>
          </Overlay>
        </main>
        <Footer />
      </>
    );
  }
}

export default Game;
