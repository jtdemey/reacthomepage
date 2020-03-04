const WebSocket = require('ws');
import logger from '../logs/logWriter';
import { makeGameSuite } from './gameSuite';

const makeServer = webServer => {
  const wss = new WebSocket.Server({
    perMessageDeflate: false,
    server: webServer
  });
  return wss;
};

const handleSocketMsg = (wss, ws, raw) => {
  const msg = wss.gs.parseRes(raw);
  if(msg.command !== 'ping') {
    logger.debug(`[GS] Socket ${msg.socketId} says "${msg.command}"`);
  }
  let result;
  switch(msg.command) {
    //General
    case 'socketDisconnect':
      wss.gs.removePlayer(msg.socketId, true);
      break;
    //Imposter
    case 'launchedImposter':
      wss.gs.addPlayer(wss.gs.makePlayer(ws, msg.socketId), true);
      ws.send(wss.gs.makeCommand('acceptImposterLaunch'));
      break;
    case 'submitHostGame':
      result = wss.gs.handleSubmitHostGame(msg);
      if(result) {
        ws.send(wss.gs.makeCommand('initGame', { gameState: result }));
      }
      break;
    case 'submitJoinGame':
      result = wss.gs.handleSubmitJoinGame(msg);
      if(result) {
        ws.send(wss.gs.makeCommand('initGame', { gameState: result }));
      }
      break;
    case 'extendTimer':
      wss.gs.extendTimer(msg.socketId, msg.gameId);
      break;
    case 'hurryUp':
      wss.gs.hurryUp(msg.socketId, msg.gameId);
      break;
    case 'toggleReadyState':
      wss.gs.toggleReadyState(msg);
      break;
    case 'accusePlayer':
      wss.gs.handleAccusePlayer(msg);
      break;
    case 'returnToLobby':
      wss.gs.handleLobbyReturnVote(msg);
      break;
    case 'castVote':
      wss.gs.castVote(msg);
      break;
    case 'identifyScenario':
      wss.gs.identifyScenario(msg);
      break;
    default:
      logger.error(`[WS] Socket command '${msg.command}' not recognized`);
      break;
  }
};

export const createWebSocketServer = server => {
  const wss = makeServer(server);
  wss.gs = makeGameSuite();
  wss.gs.startIdleClock();
  wss.on('connection', ws => {
    ws.on('message', e => {
      handleSocketMsg(wss, ws, e);
    });
  });
  return wss;
};