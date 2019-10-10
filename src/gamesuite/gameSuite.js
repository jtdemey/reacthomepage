import logger from '../logs/logWriter';

export const makeGameSuite = () => {
  const gameSuite = {};

  gameSuite.isIdle = false;
  gameSuite.clock = null;
  gameSuite.gameList = [];
  gameSuite.playerList = [];

  //Creators
  gameSuite.makeCommand = (commName, params = null) => {
    if(params) {
      return JSON.stringify({
        command: commName,
        ...params
      });
    }
    return JSON.stringify({
      command: commName
    });
  };
  gameSuite.makeGame = () => {
    return {
      gameId: gameSuite.genGameId(),
      gameTitle: 'imposter',
      host: null,
      isPaused: false,
      players: [],
      phase: 'lobby',
      remainingTime: 10, //To-do: change this
      scenario: null,
      condition: null,
      tick: 0,
      votes: []
    };
  };
  gameSuite.makePlayer = (socket, sockId) => {
    return {
      extendTimerCt: 0,
      gameId: null,
      hurryUpCt: 0,
      isPlaying: false,
      name: null,
      socket: socket,
      socketId: sockId
    };
  };
  gameSuite.makeVote = (type, callerId, accusedId = null) => {
    return {
      voteType: type,
      callerId: callerId,
      accusedId: accusedId,
      yay: 0,
      nay: 0
    };
  };

  //Utilities
  gameSuite.emitToGame = (gameId, command, debug = false) => {
    const gamePlayers = gameSuite.playerList.filter(p => p.gameId === gameId);
    for(let j = 0; j < gamePlayers.length; j++) {
      if(debug) {
        logger.info(`Sending ${JSON.parse(command).command} to ${gamePlayers[j].socketId}`);
      }
      gamePlayers[j].socket.send(command);
    }
  };
  gameSuite.genGameId = () => {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for(let i = 0; i < 4; i++) {
      const cInd = Math.floor(Math.random() * abc.length);
      const c = abc.charAt(cInd);
      id += c;
    }
    return id;
  };
  gameSuite.parseRes = msg => {
    try {
      const r = JSON.parse(msg);
      return r;
    } catch {
      logger.error(`[GS] Unable to parse client message ${msg}`);
    }
  };

  //Getters
  gameSuite.getGame = gameId => {
    return gameSuite.gameList.filter(g => g.gameId === gameId)[0];
  };
  gameSuite.getPlayer = socketId => {
    return gameSuite.playerList.filter(p => p.socketId === socketId)[0];
  };

  //Setters
  gameSuite.updateGame = (gameId, gameData) => {
    let g = gameSuite.getGame(gameId.toUpperCase());
    if(!g) {
      logger.error(`Could not update game ${gameId}`);
    }
    g = {
      ...g,
      ...gameData
    };
    const f = gameSuite.gameList.filter(g => g.gameId !== gameId);
    gameSuite.gameList = f.concat([g]);
  };
  gameSuite.updatePlayer = (socketId, playerData) => {
    let p = gameSuite.getPlayer(socketId);
    if(!p) {
      logger.error(`Could not update player ${socketId}`);
    }
    p = {
      ...p,
      ...playerData
    };
    const f = gameSuite.playerList.filter(p => p.socketId !== socketId);
    gameSuite.playerList = f.concat([p]);
  };

  //Adders
  gameSuite.addGame = (game, debug = false) => {
    gameSuite.gameList = gameSuite.gameList.concat([game]);
    if(debug) {
      logger.info(`Added game ${game.gameId} (Total: ${gameSuite.gameList.length})`);
    }
  };
  gameSuite.addPlayer = (player, debug = false) => {
    gameSuite.playerList = gameSuite.playerList.concat([player]);
    if(debug) {
      logger.info(`Added player ${player.socketId} (Total: ${gameSuite.playerList.length})`);
    }
  };

  //Deleters
  gameSuite.removeGame = (gameId, debug = false) => {
    gameSuite.gameList = gameSuite.gameList.filter(g => g.gameId !== gameId);
    if(debug) {
      logger.info(`Removed game ${gameId} (Total: ${gameSuite.gameList.length})`);
    }
  };
  gameSuite.removePlayer = (socketId, debug = false) => {
    gameSuite.playerList = gameSuite.playerList.filter(p => p.socketId !== socketId);
    if(debug) {
      logger.info(`Removed player ${socketId} (Total: ${gameSuite.playerList.length})`);
    }
  };

  //Lifecycle
  gameSuite.doGameTick = game => {
    let g = {
      ...game
    };
    g.tick += 1;
    g.remainingTime -= 1;
    if(g.remainingTime < 0) {
      g = gameSuite.iteratePhase(g);
    }
    return g;
  };
  gameSuite.iteratePhase = game => {
    let g = {
      ...game
    };
    let phase;
    let remain;
    switch(g.phase) {
      case 'lobby':
        phase = 'in-game';
        remain = '240';
        break;
      case 'in-game':
        phase = 'imposter-victory';
        remain = '10';
        break;
      case 'bystander-victory':
      case 'imposter-victory':
        phase = 'lobby';
        remain = '60';
        break;
      default:
        logger.info(`Unrecognized game phase ${g.phase}`);
        break;
    }
    return {
      ...g,
      phase: phase,
      remainingTime: remain
    };
  };
  gameSuite.startGameClock = () => {
    gameSuite.clock = setInterval(() => {
      if(gameSuite.gameList.length < 1) {
        logger.info('[GS] Going idle...');
        clearInterval(gameSuite.clock);
        gameSuite.startIdleClock(gameSuite);
      }
      const activeGames = gameSuite.gameList.filter(g => g.isPaused === false && g.players.length > 0);
      //logger.info(gameSuite.gameList[0].players.length);
      for(let i = 0; i < activeGames.length; i++) {
        let g = activeGames[i];
        g = gameSuite.doGameTick(g);
        gameSuite.updateGame(g.gameId, { ...g });
        gameSuite.emitToGame(g.gameId, gameSuite.makeCommand('gameTick', {
          gameState: g
        }));
      }
    }, 1000);
  };
  gameSuite.startIdleClock = () => {
    gameSuite.clock = setInterval(() => {
      if(gameSuite.gameList.length > 0) {
        logger.info(`[GS] Bootin' up!`);
        clearInterval(gameSuite.clock);
        gameSuite.startGameClock(gameSuite);
      }
    }, 3000);
  };

  //Message Handlers
  gameSuite.handleSubmitHostGame = msg => {
    const newImposter = gameSuite.makeGame();
    gameSuite.updatePlayer(msg.socketId, {
      gameId: newImposter.gameId,
      name: msg.hostName || 'Dingus'
    });
    const hostPlayer = gameSuite.getPlayer(msg.socketId);
    newImposter.host = hostPlayer.socketId;
    newImposter.players = newImposter.players.concat([hostPlayer]);
    gameSuite.addGame(newImposter, true);
    return newImposter;
  };
  gameSuite.handleSubmitJoinGame = msg => {
    const prospImposter = gameSuite.getGame(msg.gameId.toUpperCase());
    if(!prospImposter) {
      logger.error(`Could not find game ${msg.gameId}`);
      return;
    }
    const joiner = gameSuite.getPlayer(msg.socketId);
    joiner.gameId = msg.gameId;
    joiner.name = msg.playerName;
    gameSuite.updatePlayer(msg.socketId, {
      gameId: msg.gameId,
      name: msg.playerName
    });
    const newPlayers = prospImposter.players.concat([joiner]);
    gameSuite.updateGame(msg.gameId, {
      players: newPlayers
    });
    return {
      ...prospImposter,
      players: newPlayers
    };
  };
  gameSuite.handleAccusePlayer = msg => {
    const currGame = gameSuite.getGame(msg.gameId);
    if(currGame.votes.some(v => v.accuserId === msg.accuserId)) {
      return;
    }
    const accusation = gameSuite.makeVote('accusation', msg.accuserId, msg.accusedId);
    const newVotes = currGame.votes.concat([accusation]);
    gameSuite.updateGame(msg.gameId, {
      votes: newVotes
    });
    return newVotes;
  };
  return gameSuite;
};