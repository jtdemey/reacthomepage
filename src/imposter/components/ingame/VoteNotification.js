import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { castVote } from '../../actions/gameActions';

const getVoteText = (vtype, caller, accused = null) => {
  if(vtype === 'accusation') {
    return `${caller} accuses ${accused} as the Imposter!`;
  } else if(vtype === 'lobby') {
    return `${caller} wants to return to the lobby.`;
  }
  console.error(`getVoteText: vote type ${vtype} is not recognized`);
};

const VoteNotification = props => {
  const state = useSelector(state => ({
    castedVotes: state.game.castedVotes,
    gameId: state.game.gameId,
    socketId: state.game.socketId
  }));
  const dispatch = useDispatch();
  const hasCasted = state.castedVotes.some(v => v.voteId === props.voteId);
  const look = {
    background: props.bgColor
  };
  return (
    <div className="vote-notification fade-in" style={look}>
      <p className="vote-text">{getVoteText(props.voteType, props.callerName, props.accusedName)}</p>
      <p className="vote-text-half">{`${props.yay}/${props.threshold} needed`}</p>
      <p className="vote-text-half">{`Closing in ${props.tick}`}</p>
      <div className={hasCasted ? 'vote-btns fade-out' : 'vote-btns'}>
        <div className="vote-yay" style={{background: props.btnColor}} onClick={() => dispatch(castVote(true, state.gameId, state.socketId, props.voteId))}>Yay</div>
        <div className="vote-nay" style={{background: props.btnColor}} onClick={() => dispatch(castVote(false, state.gameId, state.socketId, props.voteId))}>Nay</div>
      </div>
    </div>
  );
};

export default VoteNotification;