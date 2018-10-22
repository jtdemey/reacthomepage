import Imposter from './imposter';
import logger from '../logWriter';
import Poller from './poller';

export default class gameSuite {

  constructor(based, idled) {
    this.globalPause = false;
    this.isIdle = false;
    this.gameList = {};
    this.socketList = {};
    this.playerList = {};
    this.baseClock = undefined;
    this.idleClock = undefined;
    this.baseTickDelay = based;
    this.idleTickDelay = idled;

    this.masterTick = this.masterTick.bind(this);
    this.idleTick = this.idleTick.bind(this);
    this.imposterTick = this.imposterTick.bind(this);
    this.masterTick = this.masterTick.bind(this);
    this.masterTick = this.masterTick.bind(this);

    this.startBase = this.startBase.bind(this);
    this.stopBase = this.stopBase.bind(this);
    this.startIdle = this.startIdle.bind(this);
    this.stopIdle = this.stopIdle.bind(this);

    this.lobbyCreate = this.lobbyCreate.bind(this);
    this.lobbyJoin = this.lobbyJoin.bind(this);

    this.emitToGame = this.emitToGame.bind(this);
    this.generateGC = this.generateGC.bind(this);
    this.getNewGame = this.getNewGame.bind(this);
    this.getGame = this.getGame.bind(this);
    this.imposterSocket = this.imposterSocket.bind(this);
  }

  //Ticks
  masterTick() {
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
  }

  idleTick() {
    if(Object.keys(this.gameList).length > 0) {
      logger.info("[GameSuite] Booting up!");
      this.stopIdle();
      this.startBase();
    }
  }

  imposterTick() {
    /**IMPOSTER
          ph0: lobby
          ph1: game
          ph2: vote call (time run out)
          ph3: imposter victory
          ph4: bystander victory (imposter messed up)
    **/
    let imp = new Imposter();
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
  }

  //Clock
  startBase() {
    logger.info('ehhh, starting the clock, lad');
    this.baseClock = setInterval(this.masterTick, this.baseTickDelay);
  }

  stopBase() {
    clearInterval(this.baseClock);
  }

  startIdle() {
    this.idleClock = setInterval(this.idleTick, this.idleTickDelay);
  }

  stopIdle() {
    clearInterval(this.idleClock);
  }

  //Lobby controls
  lobbyCreate(req, res) {
    res.contentType('application/json');
    let pl = req.body;
    if(pl.gametitle == 'pistolwhip') {
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
    }
    this.playerList[player.id] = player;
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
  }

  //Utility
  emitToGame(event, gc) {
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
  }

  generateGC() {
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
  }

  getNewGame(gameName) {
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
        let imp = new Imposter();
        imp.assignRoles(gameState);
        return gameState;
    }
  }

  getGame() {
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

  //Socket behavior
  imposterSocket(socket) {

    //Connection ====================================================
    let slen = Object.keys(this.socketList).length;
    socket.id = slen + 1;
    socket.player = this.playerList[socket.id];
    socket.gameState = null;
    socket.ip = socket.request.connection.remoteAddress;
    this.socketList[socket.id] = socket;
    logger.info("Socket connection initialized: socket " + socket.id + " (" + socket.ip + ")");

    //Test ===========================================================
    socket.on('sockettest', (data) => {
      logger.info(data.welcome);
    });

    //Setup ==========================================================
    socket.emit('setup', {
      socketId: socket.id
    });

    socket.on('sendGC', (data) => {
      //Fetch and assign gamestate
      socket.gameCode = data.gameCode;
      socket.gameState = this.getGame(socket.gameCode);
      logger.info("[Imposter] Socket " + socket.id + " has joined game " + socket.gameCode);
      socket.emit('playerJoin', {
        gameState: socket.gameState,
        player: socket.player
      });
      this.emitToGame('refreshPlayers', socket.gameState.gameCode);
      if(socket.gameState.phase == 0) {
        if(socket.gameState.title == "imposter") {
          let ph0data = {
            gameState: socket.gameState,
            scenarios: imposter.getScenarios()
          };
        } else {
          let ph0data = { gameState: socket.gameState };
        }
        socket.emit('setupPh0', ph0data);
      }
    });

    //Disconnection ==================================================
    socket.on('disconnect', function() {
        //Remove player
        socket.gameState.players[socket.id] = "";
        socket.gameState.playerct -= 1;
        //Move players down
        if(socket.gameState.players[socket.id + 1] != "") {
          for(let i = (socket.id + 1); i < 7; i++) {
            if(socket.gameState.title == "imposter") {
              socket.gameState.players[i - 1] = socket.gameState.players[i];
              socket.gameState.players[i] = "";
              socket.gameState.roles[i - 1] = socket.gameState.roles[i];
              socket.gameState.roles[i] = "";
            }
          }
        }
        //Remove game if no players left
        let isEmpty = true;
        for(let i = 1; i < 11; i++) {
          if(socket.gameState.players[i] != "") {
            isEmpty = false;
          }
        }
        if(isEmpty == true) {
          logger.info("[GameSuite] Game " + socket.gameState.gameCode + " abandoned: removing...");
          delete this.gameList[socket.gameState.gameCode];
        }
        this.emitToGame('refreshPlayers', socket.gameState.gameCode);
        //Remove socket/player
        delete this.socketList[socket.id];
        delete this.playerList[socket.id];
        logger.info("Socket " + socket.id + " disconnected");
      });
    
    //Buttons ========================================================
    socket.on('postpone', function() {
      if(socket.gameState.postpones > 4) {
        socket.emit('tooManyPostpones');
        return;
      } else {
        socket.gameState.postpones = socket.gameState.postpones + 1;
        socket.gameState.timers[0] = socket.gameState.timers[0] + 15;
      }
    });
    
    socket.on('impatience', function() {
      socket.gameState.timers[0] = socket.gameState.timers[0] - 10;
    });
    //----------------------------------------------------------------

    //Pausing ========================================================
    socket.on('pause', function() {
      socket.gameState.inProgress = false;
      logger.info("Game paused (" + socket.id);
    });

    socket.on('unpause', function() {
      socket.gameState.inProgress = true;
      logger.info("Game resumed");
    });

    //Events =========================================================
    //~~~ Imposter ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    socket.on('imposterVictory', function() {
      socket.gameState.phase = 3;
      this.emitToGame('setupPh3', socket.gameState.gameCode);
    });

    socket.on('imposterFailure', function() {
      socket.gameState.phase = 4;
      this.emitToGame('setupPh4', socket.gameState.gameCode);
    });

    socket.on('callRestartVote', function(data) {
      if(!('restart' in socket.gameState.votes)) {
        let rvote = {
          caller: socket.id,
          callerslot: data.slot,
          time: 10,
          agree: 1,
          agreed: []
        }
        rvote.agreed.push(data.slot);
        socket.gameState.votes['restart'] = rvote;
        logger.info("[GameSuite] Vote for restart called by S" + socket.id + " for " + socket.gameState.gameCode);
        this.emitToGame('restartVote', socket.gameState.gameCode);
      }
    });

    socket.on('voteForRestart', function() {
      if('restart' in socket.gameState.votes && socket.gameState.votes['restart'].agreed.indexOf(socket.player.slot) == -1) {
        socket.gameState.votes['restart'].agree += 1;
        if(socket.gameState.votes.restart.agree >= Math.round(socket.gameState.playerct * .75)) {
          logger.info("[GameSuite] [" + socket.gameState.gameCode + "] Restart vote successful, restarting game...");
          socket.gameState.joinable = true;
          socket.gameState.timers[0] = 60;
          socket.gameState.timers[1] = 360;
          socket.gameState.phase = 0;
          socket.gameState = imposter.assignRoles(socket.gameState);
          this.emitToGame('restartGame', socket.gameState.gameCode);
          setTimeout(function() {
            this.emitToGame('setup', socket.gameState.gameCode);
            this.emitToGame('setupPh0', socket.gameState.gameCode);
          }, 800);
        }
      }
      this.emitToGame('updateVotes', socket.gameState.gameCode);
    });

    socket.on('callReplayVote', function(data) {
      if(!('replay' in socket.gameState.votes)) {
        let rvote = {
          caller: socket.id,
          callerslot: data.slot,
          time: 10,
          agree: 1,
          agreed: []
        }
        rvote.agreed.push(data.slot);
        socket.gameState.votes['replay'] = rvote;
        logger.info("[GameSuite] Vote for replay called by S" + socket.id + " for " + socket.gameState.gameCode);
        this.emitToGame('replayVote', socket.gameState.gameCode);
      }
    });

    socket.on('voteForReplay', function() {
      if('replay' in socket.gameState.votes && socket.gameState.votes['replay'].agreed.indexOf(socket.player.slot) == -1) {
        socket.gameState.votes['replay'].agree += 1;
        if(socket.gameState.votes.replay.agree >= Math.round(socket.gameState.playerct * .75)) {
          logger.info("[GameSuite] [" + socket.gameState.gameCode + "] Replay vote successful, resetting scenarios...");
          socket.gameState.timers[0] = 60;
          socket.gameState.timers[1] = 360;
          socket.gameState.phase = 1;
          socket.gameState = imposter.assignRoles(socket.gameState);
          socket.gameState = imposter.chooseImposter(socket.gameState);
          this.emitToGame('replayGame', socket.gameState.gameCode);
          setTimeout(function() {
            this.emitToGame('setupPh1', socket.gameState.gameCode);
          }, 800);
        }
      }
      this.emitToGame('updateVotes', socket.gameState.gameCode);
    });
  }
}