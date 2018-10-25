import express from 'express';
import path from 'path';

import gameSuite from '../app/gamesuite/gameSuite';
import logger from '../app/logWriter';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/html/home.html'));
});

router.get('/survive', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/html/survive.html'));
});

router.get('/gamesuite', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/html/lobby.html'));
});

router.get('/gamesuite/imposter/:gameCode', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/html/imposter.html'));
});

router.get('/gamesuite/pistolwhip', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/html/pistolwhip.html'));
});

router.get('/roleroller', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/html/roleroller.html'));
});

router.post('/gamesuite/scripts/makeGame', (req, res) => {
  logger.info('okeydoke');
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

export default router;