import React from 'react';
import { useSelector } from 'react-redux';

const getVoteText = (vtype, caller, accused = null) => {
  if(vtype === 'accusation') {
    return `${caller} accuses ${accused} as the Imposter!`;
  } else if(vtype === 'lobby') {
    return `${caller} wants to return to the lobby.`;
  }
  console.error(`getVoteText: vote type ${vtype} is not recognized`);
};

const VoteNotification = props => {
  const socketId = useSelector(state => state.game.socketId);
  const look = {
    background: props.bgColor
  };
  return (
    <div className="vote-notification fade-in" style={look}>
      <p className="vote-text">{getVoteText(props.voteType, props.callerName, props.accusedName)}</p>
      <p className="vote-text">{`${props.yay}/${props.threshold} || Closing in ${props.tick}`}</p>
      <div className="vote-btns">
        <div className="vote-yay" style={{background: props.btnColor}}>Yay</div>
        <div className="vote-nay" style={{background: props.btnColor}}>Nay</div>
      </div>
    </div>
  );
};

export default VoteNotification;