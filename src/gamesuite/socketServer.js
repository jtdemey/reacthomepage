const WebSocket = require('ws');
import logger from '../logs/logWriter';
import { makeGameSuite } from './gameSuite';

const makeServer = webServer => {
  const wss = new WebSocket.Server({
    perMessageDeflate: false,
    server: webServer
  });
  wss.gs = makeGameSuite();
  return wss;
};

export const createWebSocketServer = server => {
  const wss = makeServer(server);
  wss.gs.startIdleClock();
  wss.on('connection', ws => {
    ws.on('message', e => {
      let socketImposter;
      let socketVotes;
      const msg = wss.gs.parseRes(e);
      if(msg.command !== 'ping') {
        logger.debug(`[GS] Socket ${msg.socketId} says "${msg.command}"`);
      }
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
          socketImposter = wss.gs.handleSubmitHostGame(msg);
          ws.send(wss.gs.makeCommand('initGame', { gameState: socketImposter }));
          break;
        case 'submitJoinGame':
          socketImposter = wss.gs.handleSubmitJoinGame(msg);
          ws.send(wss.gs.makeCommand('initGame', { gameState: socketImposter }));
          break;
        case 'extendTimer':
          socketImposter = wss.gs.getGame(msg.gameId);
          wss.gs.updateGame(msg.gameId, { remainingTime: socketImposter.remainingTime + 20 });
          break;
        case 'hurryUp':
          socketImposter = wss.gs.getGame(msg.gameId);
          wss.gs.updateGame(msg.gameId, { remainingTime: socketImposter.remainingTime - 1 });
          break;
        case 'accusePlayer':
          socketVotes = wss.gs.handleAccusePlayer(msg);
          ws.send(wss.gs.makeCommand('refreshVotes', { votes: socketVotes }));
          break;
        default:
          logger.error(`[WS] Socket command '${msg.command}' not recognized`);
          break;
      }
    });
  });
  return wss;
};