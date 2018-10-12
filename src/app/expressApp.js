//DEPENDENCIES
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

//LOCAL DEPENDENCIES
import expressRoutes from '../routes/expressRoutes';
import connectBot from './connectBot';

//CONFIGURATION
dotenv.config({
  silent: true
});

const app = express();

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public'))); //DEVELOPMENT
app.use(express.static(path.join(__dirname, '/../../dist'))); //PRODUCTION
app.use('/', expressRoutes);

//404
app.use((req, res, next) => {
  res.status(404);
   if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '/../public/html/404page.html'));
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: '404 Not found' });
    return;
  }
  res.type('txt').send("404: This isn't the page you're looking for.");
});

//Render errors
app.use((err, req, res, next) => {
  res.status(200);
  res.sendFile(path.join(__dirname + '/../public/html/errorpage.html'));
  next();
});

export default app;