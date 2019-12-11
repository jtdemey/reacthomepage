import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from '../auxiliary/ListButtonItem';
import { returnToLobby } from '../../actions/gameActions';
import { toggleAccusing } from '../../actions/uiActions';
import { getThemeColors } from '../../app/imposterUtilities';

const mapStateToProps = state => {
  return {
    socketId: state.game.socketId,
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
    }
  };
};

const InGameBtns = props => {
  const look = getThemeColors(props.theme);
  return (
    <div className="lobby-btns">
      <ListButtonItem clickFunc={() => props.toggleAccusing(props.isAccusing)}
                      look={{background: props.isAccusing ? '#fff' : look.secondary}}
                      otherClasses={props.isAccusing ? 'control-lbi is-accusing-btn infinite-shake' : 'control-lbi'}
                      text={props.isAccusing ? 'Select imposter' : 'Accuse'} />
      <ListButtonItem clickFunc={() => props.returnToLobby(props.socketId, props.playerName, props.extendTimerCt)}
                      look={{background: look.secondary}}
                      otherClasses="control-lbi"
                      text="Return to Lobby" />
    </div>
  );
};

const InGameBtnsCon = connect(mapStateToProps, mapDispatchToProps)(InGameBtns);

export default InGameBtnsCon;