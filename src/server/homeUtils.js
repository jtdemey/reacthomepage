import logger from '../logs/logWriter';

export const isFunction = func => {
  return !!(func && func.constructor && func.call && func.apply);
};

export const normalizePort = val => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

export const handleServerError = (error, port) => {
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
};

export const handleServerListen = expressApp => {
  const addr = expressApp.address();
  const addrType = typeof adr === 'string';
  const bind = `${addrType ? 'pipe' : 'port'} ${addrType ? addr : addr.port}`;
  logger.info(`Bound to ${bind}: ${addr.port}`);
};