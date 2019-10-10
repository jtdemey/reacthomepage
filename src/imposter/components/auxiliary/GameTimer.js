import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    remainingTime: state.game.remainingTime
  };
};

const GameTimer = props => {
  return (
    <div className="game-timer-area">
      <h6 className="game-timer-title">{props.title}</h6>
      <h3 className="game-timer-ct">{props.remainingTime}</h3>
    </div>
  );
};

const GameTimerCon = connect(mapStateToProps)(GameTimer);

export default GameTimerCon;