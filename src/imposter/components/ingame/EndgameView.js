import React from 'react';
import { useSelector } from 'react-redux';
import GameTimer from '../auxiliary/GameTimer';
import { getFadeState, getThemeColors } from '../../app/imposterUtilities';

const getImposterName = (socketId, players) => {
  const imposter = players.filter(p => p.socketId === socketId)[0];
  return imposter ? imposter.name : 'Unknown';
};

const EndgameView = props => {
  const state = useSelector(state => ({
    gameOverReason: state.game.gameOverReason,
    imposterId: state.game.imposterId,
    players: state.game.players,
    isFadingIn: state.ui.isFadingIn,
    isFadingOut: state.ui.isFadingOut,
    theme: getThemeColors(state.ui.theme)
  }));
  return (
    <div className={`game-view endgame-view${getFadeState(state.isFadingIn, state.isFadingOut, props.viewId)}`}>
      <h1>{props.title}</h1>
      <div className="imposter-notification" style={{background: state.theme.secondary}}>
        <h3 className="text-center">Imposter</h3>
        <h2 className="text-center">{getImposterName(state.imposterId, state.players)}</h2>
      </div>
      <h2>{state.gameOverReason}</h2>
      <GameTimer title="Returning to lobby in:" />
    </div>
  );
};

export default EndgameView;