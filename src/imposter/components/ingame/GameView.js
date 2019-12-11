import React from 'react';
import { connect } from 'react-redux';
import GameCode from '../auxiliary/GameCode';
import GameTimer from '../auxiliary/GameTimer';
import InGameBtns from './InGameBtns';
import VoteArea from './VoteArea';
import NotificationArea from '../auxiliary/NotificationArea';
import PlayerList from '../auxiliary/PlayerList';
import { toggleAccusing } from '../../actions/uiActions';

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: state.game.gameId,
    socketId: state.game.socketId,
    players: state.game.players,
    isAccusing: state.ui.isAccusing,
    isFadingIn: state.ui.isFadingIn,
    isFadingOut: state.ui.isFadingOut
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAccusing: cv => {
      dispatch(toggleAccusing(cv));
    }
  };
};

class GameView extends React.Component {
  constructor(props) {
    super(props);
  }

  getClickFunc() {
    return this.props.isAccusing ? () => this.props.toggleAccusing(this.props.isAccusing) : () => false;
  }

  getFadeState(c) {
    const sc = c;
    if(this.props.isFadingOut.some(e => e === sc)) {
      c += ' fade-out';
    }
    return c;
  }

  render() {
    return (
      <div className={`game-view fade-in ${this.getFadeState('in-game')}`} onClick={this.getClickFunc()}>
        <PlayerList players={this.props.players} />
        <GameCode />
        <GameTimer title="Time left:" />
        <VoteArea />
        <NotificationArea />
        <InGameBtns socketId={this.props.socketId}
                    gameId={this.props.gameId} />
      </div>
    );
  }
}

const GameViewCon = connect(mapStateToProps, mapDispatchToProps)(GameView);

export default GameViewCon;