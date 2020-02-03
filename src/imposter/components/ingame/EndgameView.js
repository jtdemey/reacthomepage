import React from 'react';
import { useSelector } from 'react-redux';
import GameTimer from '../auxiliary/GameTimer';

const EndgameView = props => {
  const state = useSelector(state => ({
    gameOverReason: state.game.gameOverReason,
    imposterId: state.game.imposterId
  }));
  return (
    <div className="game-view endgame-view">
      <h1>{props.title}</h1>
      <h2>{state.gameOverReason}</h2>
      <GameTimer title="Returning to lobby in:" />
    </div>
  );
};

export default EndgameView;