import imposter from './imposter';
import logger from '../logWriter';
import { isFunction } from '../../server/utilityscripts';

let gameSuite = {

  globalPause: false,
  isIdle: false,
  gameList: {},
  socketList: {},
  playerList: {},
  baseClock: undefined,
  idleClock: undefined,
  baseTickDelay: 1000,
  idleTickDelay: 4000,

  //Ticks
  masterTick: function() {
    if(Object.keys(this.gameList).length < 1) {
      logger.info("[GameSuite] No games in progress, going idle...");
      this.isIdle = true;
      this.stopBase();
      this.startIdle();
    } else {
      this.isIdle = false;
    }
    for(let game in this.gameList) {
      let g = this.gameList[game];
      if(g.title == "imposter" && g.inProgress == true) {
        this.imposterTick(g);
      }
    }
  },

  idleTick: function() {
    if(Object.keys(this.gameList).length > 0) {
      logger.info("[GameSuite] Booting up!");
      this.stopIdle();
      this.startBase();
    }
  },

  imposterTick: function(g) {
    /**IMPOSTER
          ph0: lobby
          ph1: game
          ph2: vote call (time run out)
          ph3: imposter victory
          ph4: bystander victory (imposter messed up)
    **/
    let imp = new imposter();
    if(g.phase == 0) {
      g.timers[0] -= 1;
      this.emitToGame('tickPh0', g.gameCode);
      if(g.timers[0] < 1) {
        g.phase = 1;
        g.joinable = false;
        g = imp.chooseImposter(g);
        this.emitToGame('setupPh1', g.gameCode);
      }
    } else if(g.phase == 1) {
      g.timers[1] -= 1;
      this.emitToGame('tickPh1', g.gameCode);
      if(g.timers[1] < 1) {
        g.phase = 2;
        this.emitToGame('setupPh2', g.gameCode);
      }
      if(!isEmpty(g.votes)) {
        for(v in g.votes) {
          let vote = g.votes[v];
          if(vote.time < 0) {
            delete(g.votes[v]);
          } else {
            vote.time -= 1;
          }
        }
        this.emitToGame('voteTick', g.gameCode);
      }
    }
  },

  //Clock
  startBase: function() {
    this.baseClock = setInterval(this.masterTick, this.baseTickDelay);
    logger.info('[GameSuite] Started master clock');
  },

  stopBase: function() {
    clearInterval(this.baseClock);
  },

  startIdle: function() {
    this.idleClock = setInterval(this.idleTick, this.idleTickDelay);
    logger.info('[GameSuite] Started idle clock');
  },

  stopIdle: function() {
    clearInterval(this.idleClock);
  },

  //Lobby controls
  lobbyCreate: function(req, res) {
    res.contentType('application/json');
    let pl = req.body;
    if(pl.gametitle === 'pistolwhip') {
      res.writeHead(301, { Location: '/pistolwhip' });
      res.end();
      return;
    }
    //Make game
    let gameTitle = pl.gametitle;
    let newGame = this.getNewGame(gameTitle);
      newGame.players[1] = pl.name;
      newGame.playerct += 1;
      newGame.inProgress = true;
    this.gameList[newGame.gameCode] = newGame;
    //Make player
    let playerid = Object.keys(this.playerList).length + 1;
    let player = {
      id: playerid,
      slot: 1,
      name: pl.name,
      gameTitle: pl.gametitle,
      gameCode: newGame.gameCode
    };
    this.playerList[player.id] = player;
    logger.info(`Player ${player.id}: ${player.name} created`);
    res.send({
      'reqstatus': 'ready',
      'gamecode': newGame.gameCode
    });
    res.end();
  },

  lobbyJoin: function(req, res) {
    res.contentType('application/json');
    let pl = req.body;
    let myGame = this.getGame(pl.gamecode);
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
          let playerid = Object.keys(this.playerList).length + 1;
          let player = {
            id: playerid,
            slot: i,
            name: pl.name,
            gameTitle: pl.gametitle,
            gameCode: myGame.gameCode
          }
          this.playerList[player.id] = player;
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
  },

  //Utility
  emitToGame: function(event, gc) {
    let found = false;
    let game = this.getGame(gc);
    for(let s in this.socketList) {
      let socket = this.socketList[s];
      if(socket.gameCode == gc) {
        found = true;
        socket.emit(event, {
          gameState: game
        });
      }
    }
    if(found == false) {
      logger.error("[GameSuite] Error in emitToGame(" + event + "): no sockets connected to " + gc);
      delete this.gameList[gc];
    }
  },

  emitToGameC(event, gc, data) {
    if(Object.keys(this.gameList).length == 0) {
      logger.info("[GameSuite] No games in progress, going idle...");
      this.isIdle = true;
      this.stopBase();
      this.startIdle();
    }
    let found = false;
    for(let s in this.socketList) {
      let socket = this.socketList[s];
      if(socket.gameCode == gc) {
        found = true;
        socket.emit(event, data);
      }
    }
    if(found === false) {
      logger.info("[GameSuite] Error in emitToGameC(" + event + "): no sockets connected to " + gc);
      delete this.gameList[gc];
    }
  },

  generateGC: function() {
    let gcchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let gc = "";
    for(let i = 0; i < 4; i++) {
      let rc = gcchars.charAt(Math.floor(Math.random() * 26));
      gc = gc + rc;
    }
    if(this.gameList.hasOwnProperty(gc)) {
      this.generateGC();
      return;
    }
    return gc;
  },

  getNewGame: function(gameName) {
    switch(gameName) {
      case 'imposter':
        let gameState = {
          title: "imposter",
          inProgress: false,
          joinable: true,
          gameCode: this.generateGC(),
          players: {1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:""},
          playerct: 0,
          timers: {0:60,1:360},
          round: 0,
          phase: 0,
          starttime: new Date().toISOString().slice(0, 19).replace('T', ' '),
          endtime: undefined,
          postpones: 0,
          scenario: "undefined",
          roles: {1:99,2:99,3:99,4:99,5:99,6:99,7:99,8:99,9:99,10:99},
          votes: {}
        };
        let imp = new imposter();
        imp.assignRoles(gameState);
        return gameState;
    }
  },

  getGame: function(gc) {
    let found = 0;
    let keys = Object.keys(this.gameList);
    for(let i = 0; i < keys.length; i++) {
      let g = this.gameList[keys[i]];
      if(g.gameCode == gc) {
        found = 1;
        return g;
      }
    }
    if(found == 0) {
      return "GameNotFound";
    }
  }
};

for(let prop in gameSuite) {
  if(gameSuite.hasOwnProperty(prop) && isFunction(gameSuite[prop])) {
    gameSuite[prop] = gameSuite[prop].bind(gameSuite);
  }
}

export default gameSuite;