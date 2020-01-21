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

const confirmTransaction = txt => {
  logger.info(`[GS] ${txt}`);
};

const handleGsErr = err => {
  logger.error(`[GS] Error: ${err}`);
};

const handleSocketMsg = async (wss, ws, raw) => {
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
      ws.send(wss.gs.makeCommand('initGame', { gameState: result }));
      break;
    case 'submitJoinGame':
      result = wss.gs.handleSubmitJoinGame(msg);
      ws.send(wss.gs.makeCommand('initGame', { gameState: result }));
      break;
    case 'extendTimer':
      wss.gs.extendTimer(msg.socketId, msg.gameId);
      break;
    case 'hurryUp':
      wss.gs.hurryUp(msg.socketId, msg.gameId);
      break;
    case 'accusePlayer':
      wss.gs.handleAccusePlayer(msg);
      break;
    case 'returnToLobby':
      wss.gs.handleReturnToLobby(msg);
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