import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTile = styled.button.attrs({ type: 'button' })`
  align-items: stretch;
  background-color: ${props => (props.isActive ? '#363636' : '#fff')};
  border: 1px solid rgba(0, 0, 0, 0.8);
  color: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 23%;
  justify-content: space-between;
  transition: background 0.3s ease-in-out;
  width: 23%;
`;

const RemainingClicks = styled.div`
  font-size: 2.5rem;
`;

const RemainingTime = styled.div`
  font-size: 0.825rem;
`;

const DEFAULT_TIMER = 5000;
const TIMER_INTERVAL = 500;

export class Tile extends Component {
  static propTypes = {
    clicksRemaining: PropTypes.number,
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onTimeout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    clicksRemaining: 0,
    isActive: false,
  };

  state = {
    timeRemaining: DEFAULT_TIMER,
  };

  componentDidUpdate(prevProps) {
    // if it wasn't active but it is now
    if (!prevProps.isActive && this.props.isActive) {
      this.startTimer();
    }
    // if it was active but no longer is
    if (prevProps.isActive && !this.props.isActive) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  startTimer = () => {
    if (!this.props.isActive) {
      return;
    }

    this.intervalID = window.setInterval(() => {
      if (
        !this.props.isActive ||
        this.state.timeRemaining <= TIMER_INTERVAL
      ) {
        this.stopTimer();
        this.props.onTimeout(this.props.id);
        return;
      }

      this.setState(state => ({
        timeRemaining: state.timeRemaining - TIMER_INTERVAL,
      }));
    }, TIMER_INTERVAL);
  };

  stopTimer = () => {
    clearInterval(this.intervalID);

    this.setState({
      timeRemaining: DEFAULT_TIMER,
    });
  };

  render() {
    const { timeRemaining } = this.state;
    const { clicksRemaining, id, isActive, onClick } = this.props;

    return (
      <StyledTile isActive={isActive} onClick={() => onClick(id)}>
        {isActive && (
          <>
            <RemainingClicks key="0">
          {clicksRemaining > 1 && clicksRemaining}
            </RemainingClicks>
            <RemainingTime key="1">
          {timeRemaining > 0 && Math.floor(timeRemaining / 1000)}
            </RemainingTime>
          </>
        )}
      </StyledTile>
    );
  }
}

export default Tile;
