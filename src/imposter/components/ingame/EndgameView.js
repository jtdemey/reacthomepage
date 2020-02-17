import React from 'react';
import { useSelector } from 'react-redux';
import GameTimer from '../auxiliary/GameTimer';
import { getFadeState } from '../../app/imposterUtilities';

const EndgameView = props => {
  const state = useSelector(state => ({
    gameOverReason: state.game.gameOverReason,
    imposterId: state.game.imposterId,
    isFadingIn: state.ui.isFadingIn,
    isFadingOut: state.ui.isFadingOut
  }));
  return (
    <div className={`game-view endgame-view${getFadeState(state.isFadingIn, state.isFadingOut, props.viewId)}`}>
      <h1>{props.title}</h1>
      <h2>{state.gameOverReason}</h2>
      <GameTimer title="Returning to lobby in:" />
    </div>
  );
};

export default EndgameView;