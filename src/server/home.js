//Credit to https://twitter.com/teefouad for a wonderfully comprehensive server creation tutorial and several core functions

//DEPENDENCIES
import http from 'http';
import app from '../app/expressApp';
import {
  normalizePort
} from './utilityscripts.js';
import path from 'path';

//Start Express server
const expressApp = http.createServer(app);
const port = normalizePort(process.env.PORT || 5260);
let availablePort = port;

startListening(availablePort);

expressApp.on('listening', onListening);
expressApp.on('error', onError);

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
      writeToLog(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      if (availablePort - port < 10) {
        availablePort += 1;
        startListening(availablePort);
        expressApp.set('port', availablePort);
      } else {
        writeToLog(`${bind} is already in use`);
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
  writeToLog(`Server is listening on port ${bind}`);
  writeToLog(`Visit: http://localhost:${addr.port}`);
}

function startListening(servport) {
  expressApp.listen(servport);
}

function writeToLog(message) {
  process.stdout.write(`${message}\n`);
}