import React from 'react';
import { connect } from 'react-redux';
import { formatTime } from '../app/surviveUtilities';

const mapStateToProps = (state, ownProps) => {
  return {
    gameTime: state.clock.gameTime
  };
};

const GameClock = (props) => (
  <div className="game-clock">
    <span className="game-time">
      {formatTime(props.gameTime)}
    </span>
  </div>
);

const GameClockCon = connect(mapStateToProps)(GameClock);

export default GameClockCon;