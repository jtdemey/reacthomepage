import React from 'react';
import { connect } from 'react-redux';
import StatusBar from './top/StatusBar';
import GameView from './middle/GameView';
import ButtonBar from './bottom/ButtonBar';
import '../styles/survive.css';
import {
  masterTick,
  startGame
} from '../actions/gameActions';

const mapStateToProps = (state, ownProps) => {
  return {
    tick: state.game.tick
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    masterTick: (t) => {
      dispatch(masterTick(t));
    },
    startGame: (t) => {
      dispatch(startGame(t));
    }
  };
};

class SurviveApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.startGame(this.props.tick);
    this.gameClock = setInterval(() => {
      this.props.masterTick(this.props.tick);
    }, 1000);
  }

  render() {
    return (
      <div className="survive-app">
        <StatusBar />
        <GameView />
        <ButtonBar />
      </div>
    );
  }
}

const SurviveAppCon = connect(mapStateToProps, mapDispatchToProps)(SurviveApp);

export default SurviveAppCon;