import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from './ListButtonItem';
import { accusePlayer } from '../../actions/gameActions';
import { getThemeColors } from '../../app/imposterUtilities';

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: state.game.gameId,
    socketId: state.game.socketId,
    theme: state.ui.theme,
    isAccusing: state.ui.isAccusing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    accusePlayer: (uId, aId, gId) => {
      dispatch(accusePlayer(uId, aId, gId));
    }
  };
};

const PlayerList = props => {
  const look = getThemeColors(props.theme);
  return (
    <div className="player-list-area">
      <ul className="player-list">
        {props.players.map(p => (
          <ListButtonItem key={p.socketId}
                          socketId={p.socketId}
                          text={p.name}
                          otherClasses="player-list-lbi"
                          look={{background: look.secondary}}
                          rgba={[86, 73, 78, 0.75]}
                          clickFunc={props.isAccusing ? () => props.accusePlayer(props.socketId, p.socketId, props.gameId, p.name) : null} />
        ))}
      </ul>
    </div>
  );
};

const PlayerListCon = connect(mapStateToProps, mapDispatchToProps)(PlayerList);

export default PlayerListCon;