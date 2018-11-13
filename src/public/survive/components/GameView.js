import React from 'react';
import { connect } from 'react-redux';
import ViewParticles from './ViewParticles';
import ConsoleView from './ConsoleView';

const mapStateToProps = (state, ownProps) => {
  return {
    currentView: state.ui.currentView
  };
};

const GameView = (props) => (
  <div className="game-view">
    <ViewParticles mode="0"/>
    <ConsoleView view="0" />
  </div>
);

/**
<ConsoleView view="0"/>
    <ItemView view="1" />
    <MapView view="2" />
    <StatusView view="3" />
**/

const GameViewCon = connect(mapStateToProps)(GameView);

export default GameViewCon;