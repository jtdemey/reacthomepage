//DEPENDENCIES
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import serverLogger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

//LOCAL DEPENDENCIES
import expressRoutes from '../routes/expressRoutes';
import connectBot from './connectBot';
import gameSuite from './gamesuite/gameSuite';
import logger from './logWriter';


//CONFIGURATION
dotenv.config({
  silent: true
});

const app = express();

app.use(serverLogger('combined'));
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

app.post('/gamesuite/scripts/makeGame', (req, res) => {
  console.log('oohohoh');
  res.contentType('application/json');
  let pl = req.body;
  if(pl.gametitle == 'pistolwhip') {
    res.writeHead(301, { Location: '/pistolwhip' });
    res.end();
    return;
  }
  //Make game
  let gameTitle = pl.gametitle;
  let newGame = gameSuite.getNewGame(gameTitle);
    newGame.players[1] = pl.name;
    newGame.playerct += 1;
    newGame.inProgress = true;
  gameSuite.gameList[newGame.gameCode] = newGame;
  //Make player
  let playerid = Object.keys(gameSuite.playerList).length + 1;
  let player = {
    id: playerid,
    slot: 1,
    name: pl.name,
    gameTitle: pl.gametitle,
    gameCode: newGame.gameCode
  }
  gameSuite.playerList[player.id] = player;
  logger.info(`Player ${player.id}: ${player.name} created`);
  res.send({
    'reqstatus': 'ready',
    'gamecode': newGame.gameCode
  });
  res.end();
});

export default app;