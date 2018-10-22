import express from 'express';
import path from 'path';
import logger from '../app/logWriter';
import gameSuite from '../app/gamesuite/gameSuite';

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
  res.contentType('application/json');
  let pl = req.body;
  if(pl.gametitle == 'pistolwhip') {
    res.writeHead(301, { Location: '/pistolwhip' });
    res.end();
    return;
  }
  //Make game
  let gameTitle = pl.gametitle;
  let gs = new gameSuite(0, 0);
  let newGame = gs.getNewGame(gameTitle);
    newGame.players[1] = pl.name;
    newGame.playerct += 1;
    newGame.inProgress = true;
  gs.gameList[newGame.gameCode] = newGame;
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

router.post('/gamesuite/scripts/joinGame', (req, res) => {
  res.contentType('application/json');
  let pl = req.body;
  let myGame = gameSuite.getGame(pl.gamecode);
  if(myGame == "GameNotFound") {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      'reqstatus': 'error',
      'error': 'No game exists with that game code.'
    });
    res.end();
    return;
  }
  if(myGame.joinable == false) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      'reqstatus': 'error',
      'error': 'That game is currently in progress.'
    });
    res.end();
    return;
  }
  //Check if full
  let isFull = true;
  for(let p in myGame.players) {
    let pname = myGame.players[p];
    if(pname == "") {
      isFull = false;
      break;
    }
  }
  if(isFull) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      'reqstatus': 'error',
      'error': 'Sorry, that game is full.'
    });
    res.end();
    return;
  }
  //Add name
  try {
    for(let i = 0; i < 6; i++) {
      //Be original
      if(myGame.players[i] == req.body.namepromptJ && myGame.players[i] != undefined) {
        pl.name = "Other " + pl.name;
      }
      if(myGame.players[i] == "") {
        myGame.players[i] = pl.name;
        myGame.playerct += 1;
        let playerid = Object.keys(gameSuite.playerList).length + 1;
        let player = {
          id: playerid,
          slot: i,
          name: pl.name,
          gameTitle: pl.gametitle,
          gameCode: myGame.gameCode
        }
        gameSuite.playerList[player.id] = player;
        logger.info("[GameSuite] Player " + player.id + " created");
        break;
      }
    }
  } catch(err) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      'reqstatus': 'error',
      'error': 'Internal error in joining game.'
    });
    res.end();
    return;
  }
  res.send({
    'reqstatus': 'ready',
    'gamecode': myGame.gameCode
  });
  res.end();
});

export default router;