import "regenerator-runtime/runtime";
import dotenv from 'dotenv';
import createConnectBot from '../../dal/connectBot';

dotenv.config();
global.DB_URI = process.env.DB_URI;
global.connectBot = createConnectBot();