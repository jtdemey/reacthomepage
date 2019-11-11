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
  switch(msg.command) {
    //General
    case 'socketDisconnect':
      wss.gs.removePlayer(msg.socketId, true)
        .then(() => {
          confirmTransaction(`Removed player ${msg.socketId}`)
        })
        .catch(() => {
          handleGsErr(`Failed to remove player ${msg.socketId}`);
        });
      break;
    //Imposter
    case 'launchedImposter':
      wss.gs.addPlayer(wss.gs.makePlayer(ws, msg.socketId), true)
        .then(() => {
          confirmTransaction(`Added player ${msg.socketId}`);
          ws.send(wss.gs.makeCommand('acceptImposterLaunch'));
        })
        .catch(err => {
          handleGsErr(`Failed to add player ${msg.socketId} (${err})`);
        });
      break;
    case 'submitHostGame':
      wss.gs.handleSubmitHostGame(msg)
        .then(state => {
          confirmTransaction(`Handled host game submission for ${msg.socketId}`);
          ws.send(wss.gs.makeCommand('initGame', { gameState: state }));
        })
        .catch(err => {
          handleGsErr(`Failed to handle host game submission for ${msg.socketId} (${err})`);
        });
      break;
    case 'submitJoinGame':
      wss.gs.handleSubmitJoinGame(msg)
        .then(state => {
          confirmTransaction(`Handled join game submission for ${msg.socketId}`);
          ws.send(wss.gs.makeCommand('initGame', { gameState: state }));
        })
        .catch(err => {
          handleGsErr(`Failed to handle join game submission for ${msg.socketId} (${err})`);
        });
      break;
    case 'extendTimer':
      wss.gs.extendTimer(msg.gameId, 10);
      break;
    case 'hurryUp':
      wss.gs.depleteTimer(msg.gameId, 1);
      break;
    case 'accusePlayer':
      wss.gs.handleAccusePlayer(msg)
        .then(votes => {
          confirmTransaction(`Handled accuse player for ${msg.socketId}`);
          ws.send(wss.gs.makeCommand('refreshVotes', { votes: votes }));
        })
        .catch(err => {
          handleGsErr(`Failed to handle accuse player for ${msg.socketId} (${err})`);
        });
      break;
    default:
      logger.error(`[WS] Socket command '${msg.command}' not recognized`);
      break;
  }
};

export const createWebSocketServer = (server, dbConn) => {
  const wss = makeServer(server);
  wss.gs = makeGameSuite(dbConn);
  wss.gs.startIdleClock();
  wss.gs.purgeOldGameData().catch(err => logger.error(err));
  wss.on('connection', ws => {
    ws.on('message', e => {
      handleSocketMsg(wss, ws, e);
    });
  });
  return wss;
};