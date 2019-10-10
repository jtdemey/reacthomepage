import express from 'express';
import path from 'path';

import gameSuite from '../app/gamesuite/gameSuite';
import logger from '../app/logWriter';

export default class gameSuiteRoutes {

  constructor(g) {
    this.gs = g;
    this.lobbyCreate = this.lobbyCreate.bind(this);
    this.lobbyJoin = this.lobbyJoin.bind(this);
  }

  lobbyCreate(req, res) {
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
    let newGame = this.gs.getNewGame(gameTitle);
      newGame.players[1] = pl.name;
      newGame.playerct += 1;
      newGame.inProgress = true;
    this.gs.gameList[newGame.gameCode] = newGame;
    //Make player
    let playerid = Object.keys(this.gs.playerList).length + 1;
    let player = {
      id: playerid,
      slot: 1,
      name: pl.name,
      gameTitle: pl.gametitle,
      gameCode: newGame.gameCode
    }
    this.gs.playerList[player.id] = player;
    logger.info(`Player ${player.id}: ${player.name} created`);
    res.send({
      'reqstatus': 'ready',
      'gamecode': newGame.gameCode
    });
    res.end();
  }

  lobbyJoin(req, res) {
    res.contentType('application/json');
    let pl = req.body;
    let myGame = this.gs.getGame(pl.gamecode);
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
          let playerid = Object.keys(this.gs.playerList).length + 1;
          let player = {
            id: playerid,
            slot: i,
            name: pl.name,
            gameTitle: pl.gametitle,
            gameCode: myGame.gameCode
          }
          this.gs.playerList[player.id] = player;
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
  }
}