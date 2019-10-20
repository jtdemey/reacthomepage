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
      const conn = new mongoose.createConnection(process.env.DB_URI, {
        promiseLibrary: bluebird,
        useNewUrlParser: true
      });
      logger.info(`[CB] Connected to MongoDB`);
      return conn;
    } catch(err) {
      bot.handleError(err);
      return false;
    }
  };
  // bot.create = model => {
  //   model.save(err => {
  //     if(err) {
  //       bot.handleError(err);
  //     }
  //     return true;
  //   });
  //   return false;
  // };
  // bot.read = (model, params = null, whereClause = null) => {
  //   model.find(params).(err => {
  //     if(err) {
  //       bot.handleError(err);
  //     }
  //     return true;
  //   });
  //   return false;
  // };
  return bot;
};

export default createConnectBot;