import mysql from 'mysql';

let connectBot = {
  dbEnabled: true,
  dbUser: 'connectBot',
  dbAuth: '',
  getConnectionPool: function(user, auth) {
    let connPool = mysql.createPool({
      connectionLimit: 100,
      host: 'localhost',
      user: user,
      password: auth,
      database: 'jdhomepage',
      debug:  false
    });
    return connPool;
  }
};

export default connectBot;