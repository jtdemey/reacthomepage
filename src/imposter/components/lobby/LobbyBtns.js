import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from '../auxiliary/ListButtonItem';
import {
  hurryUp,
  extendTimer,
  readyUp
} from '../../actions/gameActions';
import { getThemeColors } from '../../app/imposterUtilities';

const mapStateToProps = state => {
  return {
    isReady: state.game.players.filter(p => p.socketId === state.game.socketId)[0].isReady,
    theme: state.ui.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    extendTimer: (sockId, gameId, actCt) => {
      dispatch(extendTimer(sockId, gameId, actCt));
    },
    hurryUp: (sockId, gameId, actCt) => {
      dispatch(hurryUp(sockId, gameId, actCt));
    },
    readyUp: (readyValue, socketId, gameId) => {
      dispatch(readyUp(readyValue, socketId, gameId));
    }
  };
};

const LobbyBtns = props => {
  const look = getThemeColors(props.theme);
  return (
    <div className="lobby-btns">
      <ListButtonItem clickFunc={() => props.extendTimer(props.socketId, props.gameId, props.extendTimerCt)}
                      look={{background: look.secondary}}
                      otherClasses="control-lbi"
                      text="Extend timer" />
      <ListButtonItem clickFunc={() => props.readyUp(!props.isReady, props.socketId, props.gameId)}
                      look={{background: look.secondary}}
                      otherClasses="control-lbi"
                      text={props.isReady ? 'Ready!' : 'Ready up'} />
    </div>
  );
};

const LobbyBtnsCon = connect(mapStateToProps, mapDispatchToProps)(LobbyBtns);

export default LobbyBtnsCon;