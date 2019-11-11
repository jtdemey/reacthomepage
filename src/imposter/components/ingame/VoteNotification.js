import React from 'react';
import { determineLiBorderRadius, getPlayerNameFromId } from '../../app/imposterUtilities';

const getVoteText = (vtype, votemaker, accused = null) => {
  if(vtype === 'accusation') {
    return `${getPlayerNameFromId(votemaker)} accuses ${getPlayerNameFromId(accused)} as the Imposter!`;
  } else if(vtype === 'restart') {
    return `${votemaker} wants to return to the lobby.`;
  }
  console.error(`getVoteText: vote type ${vtype} is not recognized`);
};

const VoteNotification = props => {
  const look = {
    background: props.bgColor,
    borderRadius: determineLiBorderRadius(props.notificationInd, props.notificationCt) || '0'
  };
  return (
    <div className="vote-notification fade-in" style={look}>
      <p className="vote-text">{getVoteText(props.voteType, props.callerId, props.accusedId)}</p>
      <div className="vote-btns">
        <div className="vote-yay" style={{background: props.btnColor}}>Yay</div>
        <div className="vote-nay" style={{background: props.btnColor}}>Nay</div>
      </div>
    </div>
  );
};

export default VoteNotification;