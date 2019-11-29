//Credit to https://twitter.com/teefouad for a wonderfully comprehensive server creation tutorial and several core functions

//DEPENDENCIES
import http from 'http';
import app from '../express/expressApp';
import createConnectBot from '../dal/connectBot';
import { createWebSocketServer } from '../gamesuite/socketServer';
import logger from '../logs/logWriter';
import * as homeUtilities from './homeUtils';

const port = homeUtilities.normalizePort(process.env.SERVER_PORT || 5260);
const expressApp = http.createServer(app);
expressApp.on('listening', () => homeUtilities.handleServerListen(expressApp));
expressApp.on('error', err => homeUtilities.handleServerError(err, port));
process.on('SIGINT', () => {
  process.exit();
});
expressApp.listen(port, () => {
  logger.info(`Express server started`);
});

const connectBot = createConnectBot();
const gsDbConnection = connectBot.connect('gamesuite');
const wss = createWebSocketServer(expressApp, gsDbConnection);