//Credit to https://twitter.com/teefouad for a wonderfully comprehensive server creation tutorial and several core functions

//DEPENDENCIES
import http from 'http';
import app from '../express/expressApp';
import {
  createWebSocketServer
} from '../gamesuite/socketServer';
import dbConnect from '../dal/connectBot';
import logger from '../logs/logWriter';
import { normalizePort } from './utilityscripts.js';

const expressApp = http.createServer(app);
expressApp.on('listening', onListening);
expressApp.on('error', onError);
process.on('SIGINT', () => {
  process.exit();
});

const connectBot = dbConnect.getConnectionPool('connectBot', process.env.DB_AUTH);

const wss = createWebSocketServer(expressApp);

let port = normalizePort(process.env.SERVER_PORT || 5260);
expressApp.listen(port, () => {
  logger.info(`Express server started`)
  testDBConnection();
});

//Server utility functions
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${port}`;
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = expressApp.address();
  const addrType = typeof adr === 'string';
  const bind = `${addrType ? 'pipe' : 'port'} ${addrType ? addr : addr.port}`;
  logger.info(`Bound to ${bind}: http://localhost:${addr.port}`);
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
    connection.on('error', function() {
      logger.error('Unable to establish database connection');
      dbConnect.dbEnabled = false;
    });
  });
}