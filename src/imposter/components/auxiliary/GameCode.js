import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: state.game.gameId
  };
};

const GameCode = props => (
  <div className="game-code-area">
    <h6 className="game-code-title">Game Code:</h6>
    <h3 className="game-code-text">{props.gameId}</h3>
  </div>
);

const GameCodeCon = connect(mapStateToProps)(GameCode);

export default GameCodeCon;