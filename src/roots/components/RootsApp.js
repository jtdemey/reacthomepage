import React from 'react';
import { useSelector } from 'react-redux';
import StatusBar from './top/StatusBar';
import GameView from './middle/GameView';
import ButtonBar from './bottom/ButtonBar';

const RootsApp = props => {
  return (
    <div className="survive-app">
      <StatusBar />
      <GameView />
      <ButtonBar />
    </div>
  );
};

export default RootsApp;