import React from 'react';
import { useSelector } from 'react-redux';
import VoteNotification from './VoteNotification';
import { getThemeColors } from '../../app/imposterUtilities';

const EndgameView = props => {
  const votes = useSelector(state => state.game.votes);
  const theme = useSelector(state => state.ui.theme);
  const look = getThemeColors(theme);
  return (
    <div className="endgame-view">
      
    </div>
  );
};

export default EndgameView;