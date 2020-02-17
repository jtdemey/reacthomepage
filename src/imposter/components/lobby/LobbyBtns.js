import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from '../auxiliary/ListButtonItem';
import {
  hurryUp,
  extendTimer
} from '../../actions/gameActions';
import { getThemeColors } from '../../app/imposterUtilities';

const mapStateToProps = (state, ownProps) => {
  return {
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
    }
  };
};

//To-do: add ready up
const LobbyBtns = props => {
  const look = getThemeColors(props.theme);
  return (
    <div className="lobby-btns">
      <ListButtonItem clickFunc={() => props.extendTimer(props.socketId, props.gameId, props.extendTimerCt)}
                      look={{background: look.secondary}}
                      otherClasses="control-lbi"
                      text="Extend timer" />
      <ListButtonItem clickFunc={() => props.hurryUp(props.socketId, props.gameId, props.hurryUpCt)}
                      look={{background: look.secondary}}
                      otherClasses="control-lbi"
                      text="Hurry tf up" />
    </div>
  );
};

const LobbyBtnsCon = connect(mapStateToProps, mapDispatchToProps)(LobbyBtns);

export default LobbyBtnsCon;