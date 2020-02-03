import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from '../auxiliary/ListButtonItem';
import { returnToLobby } from '../../actions/gameActions';
import {
  toggleAccusing,
  toggleModal
} from '../../actions/uiActions';
import { getThemeColors } from '../../app/imposterUtilities';

const mapStateToProps = state => {
  return {
    gameId: state.game.gameId,
    playerName: state.game.player.name,
    isAccusing: state.ui.isAccusing,
    theme: state.ui.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    returnToLobby: (sockId, name) => {
      dispatch(returnToLobby(sockId, name));
    },
    toggleAccusing: cv => {
      dispatch(toggleAccusing(cv));
    },
    toggleModal: modalId => {
      dispatch(toggleModal(modalId));
    }
  };
};

const InGameBtns = props => {
  const look = getThemeColors(props.theme);
  let scenarioBtn = null;
  if(props.isImposter) {
    scenarioBtn = (<ListButtonItem clickFunc={() => props.toggleModal(3)}
                      look={{background: look.secondary}}
                      otherClasses="control-lbi"
                      text="Identify Scenario" />);
  }
  return (
    <div className="lobby-btns">
      <ListButtonItem clickFunc={() => props.toggleAccusing(props.isAccusing)}
                      look={{background: props.isAccusing ? '#fff' : look.secondary}}
                      otherClasses={props.isAccusing ? 'control-lbi is-accusing-btn infinite-shake' : 'control-lbi'}
                      text={props.isAccusing ? 'Select imposter' : 'Accuse'} />
      <ListButtonItem clickFunc={() => props.returnToLobby(props.gameId, props.socketId, props.playerName)}
                      look={{background: look.secondary}}
                      otherClasses="control-lbi"
                      text="Return to Lobby" />
      {scenarioBtn}
    </div>
  );
};

const InGameBtnsCon = connect(mapStateToProps, mapDispatchToProps)(InGameBtns);

export default InGameBtnsCon;