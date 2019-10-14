import logger from '../logs/logWriter';
import mongodb from 'mongodb';

const createConnectBot = () => {
  return new mongodb.MongoClient(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
  // mongodb.MongoClient.connect(process.env.DB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }, (err, client) => {
  //   if(err) {
  //     logger.error('[CB] Unable to establish MongoDB connection: ' + err);
  //     return;
  //   }
  //   dbConn = client.db('gamesuite');
  //   console.log(dbConn.collection('games').find({gameId: 'testing'}).toArray());
  //   if(!dbConn) {
  //     logger.error('[CB] Unable to find "gamesuite" MongoDB database');
  //   }
  //   logger.info('[CB] Established MongoDB database connection');
  //   return dbConn;
  // });

export default createConnectBot;