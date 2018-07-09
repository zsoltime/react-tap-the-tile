import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './Tile.css';

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

    const activeContent = isActive && (
      <Fragment>
        <div className="tile__clicks" key="0">
          {clicksRemaining > 1 && clicksRemaining}
        </div>
        <div className="tile__time" key="1">
          {timeRemaining > 0 && Math.floor(timeRemaining / 1000)}
        </div>
      </Fragment>
    );

    return (
      <button
        className={`tile${isActive ? ' tile--isActive' : ''}`}
        type="button"
        onClick={() => onClick(id)}
      >
        {activeContent}
      </button>
    );
  }
}

export default Tile;
