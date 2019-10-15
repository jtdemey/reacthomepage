import mongodb from 'mongodb';

const createConnectBot = () => {
  return new mongodb.MongoClient(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

export default createConnectBot;