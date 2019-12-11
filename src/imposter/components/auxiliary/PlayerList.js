import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from './ListButtonItem';
import { accusePlayer } from '../../actions/gameActions';
import { getThemeColors } from '../../app/imposterUtilities';

const mapStateToProps = state => {
  return {
    gameId: state.game.gameId,
    socketId: state.game.socketId,
    theme: state.ui.theme,
    isAccusing: state.ui.isAccusing,
    playerName: state.game.player.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    accusePlayer: (accId, accName, tarId, tarName, gameId) => {
      dispatch(accusePlayer(accId, accName, tarId, tarName, gameId));
    }
  };
};

const PlayerList = props => {
  const look = getThemeColors(props.theme);
  const btnCss = props.isAccusing ? 'player-list-lbi ghost-highlight' : 'player-list-lbi';
  return (
    <div className="player-list-area">
      <ul className="player-list">
        {props.players.map((p, i) => (
          <ListButtonItem key={i}
                          socketId={p.socketId}
                          text={p.name}
                          otherClasses={btnCss}
                          look={{background: look.secondary}}
                          rgba={[86, 73, 78, 0.75]}
                          clickFunc={props.isAccusing ? () => props.accusePlayer(props.socketId, props.playerName, p.socketId, p.name, props.gameId) : null} />
        ))}
      </ul>
    </div>
  );
};

const PlayerListCon = connect(mapStateToProps, mapDispatchToProps)(PlayerList);

export default PlayerListCon;