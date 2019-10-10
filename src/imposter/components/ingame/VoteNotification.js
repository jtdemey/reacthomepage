import React from 'react';
import { determineLiBorderRadius, getVoteText } from '../../app/imposterUtilities';

const VoteNotification = props => {
  const look = {
    background: props.bgColor,
    borderRadius: determineLiBorderRadius(props.notificationInd, props.notificationCt) || '0'
  };
  return (
    <div className="vote-notification fade-in" style={look}>
      <p className="vote-text">{getVoteText(props.voteType, props.callerId)}</p>
      <div className="vote-btns">
        <div className="vote-yay" style={{background: props.btnColor}}>Yay</div>
        <div className="vote-nay" style={{background: props.btnColor}}>Nay</div>
      </div>
    </div>
  );
};

export default VoteNotification;