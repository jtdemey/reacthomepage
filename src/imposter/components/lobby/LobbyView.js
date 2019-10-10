import React from 'react';
import { connect } from 'react-redux';
import GameCode from '../auxiliary/GameCode';
import GameTimer from '../auxiliary/GameTimer';
import LobbyBtns from './LobbyBtns';
import NotificationArea from '../auxiliary/NotificationArea';
import PlayerList from '../auxiliary/PlayerList';
import { viewConstants } from '../../app/imposterConstants';
import { getFadeState } from '../../app/imposterUtilities';

const mapStateToProps = (state, ownProps) => {
  return {
    extendTimerCt: state.game.player.extendTimerCt,
    gameId: state.game.gameId,
    hurryUpCt: state.game.player.hurryUpCt,
    players: state.game.players,
    socketId: state.game.socketId,
    isFadingIn: state.ui.isFadingIn,
    isFadingOut: state.ui.isFadingOut
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeGameView: viewInd => {
      dispatch(changeGameView(viewInd));
    }
  };
};

class LobbyView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fade = getFadeState(this.props.isFadingIn, this.props.isFadingOut, viewConstants.LOBBY) || '';
    return (
      <div className={`lobby${fade}`}>
        <PlayerList players={this.props.players} />
        <GameCode />
        <GameTimer title="Starting in:" />
        <NotificationArea />
        <LobbyBtns  socketId={this.props.socketId}
                    gameId={this.props.gameId}
                    extendTimerCt={this.props.extendTimerCt}
                    hurryUpCt={this.props.hurryUpCt} />
      </div>
    );
  }
}

const LobbyViewCon = connect(mapStateToProps, mapDispatchToProps)(LobbyView);

export default LobbyViewCon;