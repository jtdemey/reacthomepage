import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameCode from '../auxiliary/GameCode';
import GameTimer from '../auxiliary/GameTimer';
import ScenarioPrompt from './ScenarioPrompt';
import InGameBtns from './InGameBtns';
import VoteArea from './VoteArea';
import NotificationArea from '../auxiliary/NotificationArea';
import PlayerList from '../auxiliary/PlayerList';
import { toggleAccusing } from '../../actions/uiActions';
import { viewConstants } from '../../app/imposterConstants';
import { getFadeState } from '../../app/imposterUtilities';

const getClickFunc = (props, dispatch, accuse) => {
  return props.isAccusing ? () => dispatch(accuse(props.isAccusing)) : () => false;
};

const getGamePrompt = (sockId, isImposter) => {
  if(isImposter) {
    return (
      <React.Fragment>
        <h3 className="text-center">You are the Imposter.</h3>
        <h3 className="text-center">Select the correct scenario</h3>
        <h3 className="text-center">or stall until time runs out.</h3>
      </React.Fragment>
    );
  }
  return <ScenarioPrompt socketId={sockId} />;
};

const GameView = () => {
  const state = useSelector(state => ({
    gameId: state.game.gameId,
    imposterId: state.game.imposterId,
    socketId: state.game.socketId,
    players: state.game.players,
    isAccusing: state.ui.isAccusing,
    isFadingIn: state.ui.isFadingIn,
    isFadingOut: state.ui.isFadingOut,
  }));
  return (
    <div className={getFadeState(state.isFadingIn, state.isFadingOut, viewConstants.IN_GAME)} onClick={state, getClickFunc(state, useDispatch(), toggleAccusing)}>
      <PlayerList players={state.players} />
      <GameCode />
      <GameTimer title="Time left:" />
      <VoteArea />
      <NotificationArea />
      {getGamePrompt(state.socketId, state.imposterId === state.socketId)}
      <InGameBtns socketId={state.socketId}
                  gameId={state.gameId}
                  isImposter={state.imposterId === state.socketId} />
    </div>
  );
};

export default GameView;