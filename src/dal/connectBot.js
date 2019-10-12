import dotenv from 'dotenv';
import logger from '../logs/logWriter';
import mongodb from 'mongodb';

const createConnectBot = () => {
  mongodb.MongoClient.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if(err) {
      logger.error('[CB] Unable to establish MongoDB connection: ' + err);
      return;
    }
    const db = client.db('gamesuite');
    if(!db) {
      logger.error('[CB] Unable to find "gamesuite" MongoDB database');
    }
    logger.info('[CB] Established MongoDB database connection');
    return db;
  });
};

export default createConnectBot;