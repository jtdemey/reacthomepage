import "regenerator-runtime/runtime";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import ImposterApp from './components/ImposterApp';
import ImposterStore from './store/imposterStore';
import {
  initGame,
  gameTick,
  refreshVotes,
  setPlayerSocket,
  setSocketId
} from './actions/gameActions';
import { alertMessage } from "./actions/uiActions";

window.onload = () => {

  //Socket client
  const socketUrl = process.env.WEBSOCKET_URI;
  const socket = new WebSocket(socketUrl);
  let socketId;

  const genSocketId = () => {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let id = '';
    for(let i = 0; i < 16; i++) {
      const cInd = Math.floor(Math.random() * abc.length);
      const c = abc.charAt(cInd);
      id += c;
    }
    return id;
  };

  socket.onopen = () => {
    socketId = genSocketId();
    ImposterStore.dispatch(setSocketId(socketId));
    console.log(`Socket connection established, generated socket ID ${socketId}`);
    socket.send(JSON.stringify({
      command: 'launchedImposter',
      socketId: socketId
    }));
  };
  socket.onerror = error => {
    ImposterStore.dispatch(alertMessage('Error 69: your browser sucks :(', 5000));
    console.log('Error 69: no socket for you :(');
    console.error(error);
  };
  socket.onmessage = e => {
    let msg;
    try {
      msg = JSON.parse(e.data);
    } catch(e) {
      console.log('Unable to parse incoming socket message.', e);
    }
    if(msg.command !== 'gameTick') {
      console.debug(`\tGot command "${msg.command}"`);
    }
    switch(msg.command) {
      case 'acceptImposterLaunch':
        ImposterStore.dispatch(setPlayerSocket(socket));
        break;
      case 'initGame': //Params: game
        ImposterStore.dispatch(initGame(msg.gameState));
        break;
      case 'gameTick':
        ImposterStore.dispatch(gameTick(msg.gameState));
        break;
      case 'imposterError':
        console.error(msg.text);
        ImposterStore.dispatch(alertMessage(msg.text, 5000));
        break;
      case 'refreshVotes':
        ImposterStore.dispatch(refreshVotes(msg.votes));
        break;
      default:
        console.log(`Unrecognized socket message '${msg.command}'`);
        break;
    }
  };
  socket.onclose = () => {
    ImposterStore.dispatch(alertMessage('Lost connection; try refreshing', 999999));
  };
  window.onbeforeunload = () => {
    socket.send(JSON.stringify({
      command: 'socketDisconnect',
      socketId: socketId
    }));
    return null;
  };
};

//Render app
render(
  <Provider store={ImposterStore}>
    <ImposterApp />
  </Provider>,
  document.getElementById('imposter-app')
);