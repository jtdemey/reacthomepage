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

let gsDb;
let wss;
const connectBot = createConnectBot();
const dbConnection = connectBot.connect();
console.log(dbConnection);
dbConnection.connect(err => {
  if(err) {
    logger.error('Unable to connect to MongoDB - disabling GameSuite');
    return;
  }
  gsDb = connectBot.db('gamesuite');
  logger.info('MongoDB connection established');
  wss = createWebSocketServer(expressApp, gsDb);
});