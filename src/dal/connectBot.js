import bluebird from 'bluebird';
import mongoose from 'mongoose';
import logger from '../logs/logWriter';
import makeContactSchema from '../models/Contact';

const createConnectBot = () => {
  const bot = {};
  bot.handleError = err => {
    logger.error(`[CB] Error: ${err}`);
  };
  bot.connect = dbName => {
    try {
      const conn = new mongoose.createConnection(`${process.env.DB_URI.toString()}/${dbName}`, {
        promiseLibrary: bluebird,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      logger.info(`[CB] Connected to ${dbName} MongoDB`);
      return conn;
    } catch(err) {
      bot.handleError(err);
      return false;
    }
  };
  bot.submitContactReq = async (name, text, hash) => {
    try {
      const conn = new mongoose.createConnection(`${process.env.DB_URI.toString()}/jdhomepage`, {
        promiseLibrary: bluebird,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      const contactModel = conn.model('Contact', makeContactSchema());
      const contact = new contactModel({
        name: name,
        message: text,
        timestamp: new Date().toISOString(),
        userHash: hash
      });
      await contact.save();
      await conn.close();
      logger.info(`[CB] Saved contact message from ${name}`);
    } catch(err) {
      bot.handleError(err);
    }
  };
  return bot;
};

export default createConnectBot;