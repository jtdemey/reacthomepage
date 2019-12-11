import React from 'react';
import GameTimer from '../auxiliary/GameTimer';
import { getThemeColors } from '../../app/imposterUtilities';

const EndgameView = props => {
  return (
    <div className="game-view endgame-view">
      <h1>{props.title}</h1>
      <GameTimer title="Returning to lobby in:" />
    </div>
  );
};

export default EndgameView;