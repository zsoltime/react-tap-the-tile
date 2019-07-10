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
const INITIAL_TILE = {
  clicksRemaining: 0,
  isActive: false,
};
const INITIAL_TILES = Array(16).fill(INITIAL_TILE);

export class Game extends Component {
  state = {
    highestScore: 0,
    isRunning: false,
    missedTiles: 0,
    score: 0,
    showGameOver: false,
    showSplash: true,
    tiles: [...INITIAL_TILES],
  };

  componentWillUnmount() {
    window.clearInterval(this.intervalID);
  }

  activateTile = id => {
    const tileId = id ? id : this.getRandomTileId();

    if (!id && this.getActiveTiles().length >= MAX_ACTIVE_TILES) {
      return;
    }

    this.setState(state => ({
      tiles: state.tiles.map((tile, i) =>
        i === tileId
          ? {
          clicksRemaining: random(NUMBER_OF_CLICKS),
          isActive: true,
            }
          : tile
      ),
    }));
  };

  getActiveTiles = () =>
    this.state.tiles.filter(tile => tile.isActive);

  deactivateTile = id => {
    this.setState(state => ({
      tiles: state.tiles.map((tile, i) =>
        i === id ? { ...INITIAL_TILE } : tile
      ),
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
      tiles: [...INITIAL_TILES],
    }));
  };

  getRandomTileId = () => {
    const id = random(15);

    return this.isAlreadyActive(id) ? this.getRandomTileId() : id;
  };

  handleClick = (id, secs) => {
    const tile = this.state.tiles[id];
    const points = Math.ceil(secs / 1000);

    if (!tile.isActive) {
      return this.gameOver();
    }

    // activate a random tile
    this.activateTile();

    this.setState(state => {
      const updatedTile = { ...state.tiles[id] };
      const moreClicksAvailable = updatedTile.clicksRemaining > 1;

      updatedTile.isActive = moreClicksAvailable ? true : false;
      updatedTile.clicksRemaining = moreClicksAvailable
        ? updatedTile.clicksRemaining - 1
        : 0;

      const score = state.score + points;
      const tiles = state.tiles.map((tile, i) =>
        i === id ? updatedTile : tile
      );

      return {
        score,
        tiles,
      };
    });
  };

  handleTimeout = id => {
    this.setState(state => ({
      missedTiles:
        state.missedTiles + state.tiles[id].clicksRemaining,
    }));
    this.deactivateTile(id);
    this.activateTile();
  };

  isAlreadyActive = id => this.state.tiles[id].isActive;

  resetGame = () => {
    this.setState({
      isRunning: true,
      missedTiles: 0,
      score: 0,
      showGameOver: false,
      showSplash: false,
      tiles: [...INITIAL_TILES],
    });
  };

  startGame = () => {
    this.resetGame();
    this.activateTile();

    this.intervalID = window.setInterval(() => {
      if (this.getActiveTiles().length < MAX_ACTIVE_TILES) {
        this.activateTile();
      }
    }, 1000);
  };

  render() {
    const {
      highestScore,
      isRunning,
      missedTiles,
      score,
      showGameOver,
      showSplash,
      tiles,
    } = this.state;

    return (
      <>
        <main>
          <Wrapper>
            <Board
              tiles={tiles}
              onClick={this.handleClick}
              onTimeout={this.handleTimeout}
            />
            {isRunning && (
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
              Score: {score} | Missed: {missedTiles}
            </div>
          </Wrapper>

          <Overlay isOpen={showSplash}>
            <Content>
              <Splash onStart={this.startGame} />
            </Content>
          </Overlay>

          <Overlay isOpen={showGameOver}>
            <Content>
              <GameOver
                highScore={highestScore}
                onStart={this.startGame}
                score={score}
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
