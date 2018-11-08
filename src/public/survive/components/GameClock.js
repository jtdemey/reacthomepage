import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    gameTime: state.gameTime
  };
};

const GameClock = ({ gameTime }) => (
  <div className="game-clock">
    <span className="game-time">
      {gameTime}
    </span>
  </div>
);

const GameClockCon = connect(mapStateToProps)(GameClock);

export default GameClockCon;