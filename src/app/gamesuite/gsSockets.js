import gameSuite from './gameSuite';
import imposter from './imposter';
import logger from '../logWriter';
import { isFunction } from '../../server/utilityscripts';

let socketFuncs = {

  //Base behavior
  baseSocket: function(socket) {

    //Connection ====================================================
    let slen = Object.keys(gameSuite.socketList).length;
    socket.id = slen + 1;
    socket.player = gameSuite.playerList[socket.id];
    socket.gameState = null;
    socket.ip = socket.request.connection.remoteAddress;
    gameSuite.socketList[socket.id] = socket;
    logger.info("Socket connection initialized: socket " + socket.id + " (" + socket.ip + ")");

    //Test ===========================================================
    socket.on('socketTest', (data) => {
      logger.info(data.welcome);
    });

    //Setup ==========================================================
    socket.emit('setup', {
      socketId: socket.id
    });

    socket.on('sendGC', (data) => {
      //Fetch and assign gamestate
      socket.gameCode = data.gameCode;
      socket.gameState = gameSuite.getGame(socket.gameCode);
      if(socket.gameState === 'GameNotFound') {
        socket.emit('socketServerError', {
          error: `Unable to find game ${data.gameCode}. It might have just ended.`
        });
      }
      //Assign game-specific socket functionality
      if(socket.gameState.title === 'imposter') {
        this.imposterSocket(socket);
      }
      logger.info("[GameSuite] Socket " + socket.id + " has joined game " + socket.gameCode);
      //Emit player join and refresh players
      socket.emit('playerJoin', {
        gameState: socket.gameState,
        player: socket.player
      });
      gameSuite.emitToGame('refreshPlayers', socket.gameState.gameCode);
      //Prepare game start
      if(socket.gameState.title === 'imposter') {
        if(socket.gameState.phase == 0) {
          let ph0data = {
            gameState: socket.gameState,
            scenarios: imposter.getScenarios()
          };
          socket.emit('setupPh0', ph0data);
        }
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
        delete gameSuite.gameList[socket.gameState.gameCode];
      }
      gameSuite.emitToGame('refreshPlayers', socket.gameState.gameCode);
      //Remove socket/player
      delete gameSuite.socketList[socket.id];
      delete gameSuite.playerList[socket.id];
      logger.info("Socket " + socket.id + " disconnected");
    });

    //Pausing ========================================================
    socket.on('pause', function() {
      socket.gameState.inProgress = false;
      logger.info("Game paused (" + socket.id);
    });

    socket.on('unpause', function() {
      socket.gameState.inProgress = true;
      logger.info("Game resumed");
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
        gameSuite.emitToGame('imp_restartVote', socket.gameState.gameCode);
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
          gameSuite.emitToGame('restartGame', socket.gameState.gameCode);
          setTimeout(function() {
            gameSuite.emitToGame('setup', socket.gameState.gameCode);
            gameSuite.emitToGame('setupPh0', socket.gameState.gameCode);
          }, 800);
        }
      }
      gameSuite.emitToGame('updateVotes', socket.gameState.gameCode);
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
        gameSuite.emitToGame('replayVote', socket.gameState.gameCode);
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
          gameSuite.emitToGame('replayGame', socket.gameState.gameCode);
          setTimeout(function() {
            gameSuite.emitToGame('setupPh1', socket.gameState.gameCode);
          }, 800);
        }
      }
      gameSuite.emitToGame('updateVotes', socket.gameState.gameCode);
    });

    //Imposter
    
    //Buttons ========================================================
    socket.on('imp_postpone', function() {
      if(socket.gameState.postpones > 4) {
        socket.emit('tooManyPostpones');
        return;
      } else {
        socket.gameState.postpones = socket.gameState.postpones + 1;
        socket.gameState.timers[0] = socket.gameState.timers[0] + 15;
      }
    });
    
    socket.on('imp_impatience', function() {
      socket.gameState.timers[0] = socket.gameState.timers[0] - 10;
    });

    //Events =========================================================
    socket.on('imp_victory', function() {
      socket.gameState.phase = 3;
      gameSuite.emitToGame('setupPh3', socket.gameState.gameCode);
    });

    socket.on('imp_failure', function() {
      socket.gameState.phase = 4;
      gameSuite.emitToGame('setupPh4', socket.gameState.gameCode);
    });
  }
};

for(let prop in socketFuncs) {
  if(socketFuncs.hasOwnProperty(prop) && isFunction(socketFuncs[prop])) {
    socketFuncs[prop] = socketFuncs[prop].bind(socketFuncs);
  }
}

export default socketFuncs;