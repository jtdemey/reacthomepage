//Credit to https://twitter.com/teefouad for a wonderfully comprehensive server creation tutorial and several core functions

//DEPENDENCIES
import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';

import app from '../app/expressApp';
import dbConnect from '../app/connectBot';
import gameSuite from '../app/gamesuite/gameSuite';
import getPoller from '../app/gamesuite/poller';
import gameSuiteRoutes from '../routes/gameSuiteRoutes';
import logger from '../app/logWriter';
import {
  isFunction,
  normalizePort
} from './utilityscripts.js';

//Start GameSuite
//let gs = new gameSuite(1000, 4000);
//gs.startBase();
gameSuite.startBase();

/**const gsRouter = express.Router();
const gsRoutes = new gameSuiteRoutes(gs);
gsRouter.post('/scripts/makeGame', gsRoutes.lobbyCreate);
gsRouter.post('/scripts/joinGame', gsRoutes.lobbyJoin);
app.use('/gamesuite', gsRouter);**/

//Start Express server
const expressApp = http.createServer(app);
const port = normalizePort(process.env.PORT || 5260);
let availablePort = port;

startListening(availablePort);

expressApp.on('listening', onListening);
expressApp.on('error', onError);

//Connect to db
let connectBot = undefined;
let dbauth = '';
fs.readFile('D:/Misc/auth/wegotdb.txt', 'utf8', function(err, data) {
  if(err) {
    logger.info('!!! Error in retrieving database authentication info. !!!');
  }
  dbauth = data;
});
setTimeout(function() {
  connectBot = dbConnect.getConnectionPool('connectBot', dbauth);
  testDBConnection();
}, 2000);

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
        expressApp.set('port', availablePort);
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