import React from 'react';
import { useSelector } from 'react-redux';
import VoteNotification from './VoteNotification';
import { getThemeColors } from '../../app/imposterUtilities';

const VoteArea = () => {
  const votes = useSelector(state => state.game.votes);
  const theme = useSelector(state => state.ui.theme);
  const look = getThemeColors(theme);
  return (
    <div className="vote-area">
      {votes.map(v => (
        <VoteNotification {...v} key={v.voteId} bgColor={look.secondary} btnColor={look.highlight} />
      ))}
    </div>
  );
};

export default VoteArea;