//Credit to https://twitter.com/teefouad for a wonderfully comprehensive server creation tutorial and several core functions

//DEPENDENCIES
import http from 'http';
import socketIO from 'socket.io';

import app from '../app/expressApp';
import dbConnect from '../app/connectBot';
import gameSuite from '../app/gamesuite/gameSuite';
import gsSockets from '../app/gamesuite/gsSockets';
import logger from '../app/logWriter';
import {
  normalizePort
} from './utilityscripts.js';

//Start GameSuite
gameSuite.startBase();

//Start Express server
const expressApp = http.createServer(app);
let port = normalizePort(process.env.SERVER_PORT || 5260);

startListening(port);

expressApp.on('listening', onListening);
expressApp.on('error', onError);
process.on('SIGINT', () => {
  process.exit();
});

//Connect to db
let connectBot = dbConnect.getConnectionPool('connectBot', process.env.DB_AUTH);
testDBConnection();

//Configure websockets
let io = new socketIO(expressApp);
//io.on('connection', gsSockets.baseSocket);

//===========================================================================================================================
//Server utility functions
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = `${
    typeof port === 'string' ? 'Pipe' : 'Port'
  } ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      if (availablePort - port < 10) {
        availablePort += 1;
        startListening(availablePort);
        //expressApp.set('port', availablePort);
      } else {
        logger.error(`${bind} is already in use`);
        process.exit(1);
      }
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = expressApp.address();
  const bind = `${
    typeof addr === 'string' ? 'pipe' : 'port'
  } ${
    typeof addr === 'string' ? addr : addr.port
  }`;
  logger.info(`Server is listening on port ${bind}`);
  logger.info(`Visit: http://localhost:${addr.port}`);
}

function startListening(servport) {
  expressApp.listen(servport);
}

function testDBConnection() {
  connectBot.getConnection(function(err, connection) {
    if(err) {
      logger.error('Unable to establish database connection');
      dbConnect.dbEnabled = false;
      return;
    } else {
      logger.info('Database connection successfully established');
    }
    connection.release();
    connection.on('error', function(err) {
      logger.error('Unable to establish database connection');
      dbConnect.dbEnabled = false;
    });
  });
}