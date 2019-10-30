import bluebird from 'bluebird';
import mongoose from 'mongoose';
import logger from '../logs/logWriter';

const createConnectBot = () => {
  const bot = {};
  bot.handleError = err => {
    logger.error(`[CB] Error: ${err}`);
  };
  bot.connect = () => {
    try {
      const conn = new mongoose.createConnection(process.env.DB_URI.toString(), {
        promiseLibrary: bluebird,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      logger.info(`[CB] Connected to MongoDB`);
      return conn;
    } catch(err) {
      bot.handleError(err);
      return false;
    }
  };
  return bot;
};

export default createConnectBot;