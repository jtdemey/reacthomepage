import { Promise } from 'bluebird';
import logger from '../logs/logWriter';

export const makeGameSuite = dbConnection => {
  const gameSuite = {};

  gameSuite.isIdle = false;
  gameSuite.clock = null;
  gameSuite.db = dbConnection;
  gameSuite.games = dbConnection.collection('games');
  gameSuite.players = dbConnection.collection('players');

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
  gameSuite.makeVote = (type, callerId, thresh, accusedId = null) => {
    return {
      voteType: type,
      callerId: callerId,
      accusedId: accusedId,
      yay: 0,
      nay: 0,
      threshold: thresh
    };
  };

  //Utilities
  gameSuite.countGames = () => {
    return gameSuite.games.find().count((err, ct) => {
      if(err) {
        logger.error(`[GS] Unable to get game count`);
      }
      return ct;
    });
  };
  gameSuite.countPlayers = async () => {
    const count = await gameSuite.players.find().count();
    return Promise.resolve(count);
  };
  gameSuite.emitToGame = (gameId, command, debug = false) => {
    gameSuite.players.find({gameId: gameId}).toArray((err, docs) => {
      if(err) {
        logger.error(`[GS] Unable to emitToGame ${gameId}: player query failed`);
      }
      docs.forEach(p => {
        if(debug) {
          logger.debug(`[GS] Sending ${JSON.parse(command).command} to ${p.socketId}`);
        }
        p.socket.send(command);
      });
    });
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
    gameSuite.games.find({gameId: gameId}).toArray((err, docs) => {
      if(err) {
        logger.error(`[GS] Unable to find game ${gameId}`);
        return;
      }
      return docs[0];
    });
  };
  gameSuite.getPlayer = socketId => {
    gameSuite.players.find({socketId: socketId}).toArray((err, docs) => {
      if(err) {
        logger.error(`[GS] Unable to find player ${socketId}`);
        return;
      }
      return docs[0];
    });
  };

  //Setters
  gameSuite.updateGame = (gameId, gameData) => {
    gameSuite.games.updateOne({gameId: gameId}, {$set: {...gameData}}, err => {
      if(err) {
        logger.error(`[GS] Could not update game ${gameId}`);
      }
    });
  };
  gameSuite.updatePlayer = (socketId, playerData) => {
    gameSuite.players.updateOne({socketId: socketId}, {$set: {...playerData}}, err => {
      if(err) {
        logger.error(`[GS] Could not update player ${socketId}`);
      }
    });
  };

  //Adders
  gameSuite.addGame = (game, debug = false) => {
    gameSuite.games.insertOne(game);
    if(debug) {
      logger.info(`[GS] Added game ${game.gameId} (Total: ${gameSuite.countGames()})`);
    }
  };
  gameSuite.addPlayer = (player, debug = false) => {
    gameSuite.players.insertOne(player);
    if(debug) {
      logger.info(`[GS] Added player ${player.socketId} (Total: ${gameSuite.countPlayers()})`);
    }
  };

  //Deleters
  gameSuite.removeGame = (gameId, debug = false) => {
    gameSuite.games.deleteOne({gameId: gameId});
    if(debug) {
      logger.info(`[GS] Removed game ${gameId} (Total: ${gameSuite.countGames()})`);
    }
  };
  gameSuite.removePlayer = (socketId, debug = false) => {
    gameSuite.players.deleteOne({socketId: socketId});
    const playerGames = gameSuite.games.find({players: {$elemMatch: {socketId: socketId}}}).toArray((err, docs) => {
      if(err) {
        logger.error(`[GS] Unable to query for games containing player ${socketId}`);
      }
      docs.forEach(g => {
        if(g.players.length === 0) {
          gameSuite.removeGame(g.gameId, true);
        } else {
          gameSuite.updateGame(g.gameId, { players: g.players.filter(p => p.socketId === socketId)});
        }
      });
    });
    if(debug) {
      logger.info(`[GS] Removed player ${socketId} (Total: ${gameSuite.countPlayers()})`);
    }
  };

  //Lifecycle
  gameSuite.doGameTick = game => {
    const g = {
      ...game
    };
    g.tick += 1;
    g.remainingTime -= 1;
    if(g.remainingTime < 0) {
      return gameSuite.iteratePhase(g);
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
        logger.info(`[GS] Unrecognized game phase ${g.phase}`);
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
      if(gameSuite.countGames() < 1) {
        logger.info('[GS] Going idle...');
        clearInterval(gameSuite.clock);
        gameSuite.startIdleClock();
      }
      const activeGames = gameSuite.games.find({isPaused: false, players: {$size: 0}}).toArray((err, docs) => {
        if(err) {
          logger.error('[GS] Could not find active games');
        }
        docs.forEach(g => {
          g = gameSuite.doGameTick(g);
          gameSuite.updateGame(g.gameId, { ...g });
          gameSuite.emitToGame(g.gameId, gameSuite.makeCommand('gameTick', {
            gameState: g
          }));
        });
      });
    }, 1000);
  };
  gameSuite.startIdleClock = () => {
    gameSuite.clock = setInterval(() => {
      if(gameSuite.countGames() > 0) {
        logger.info(`[GS] Clock's a tickin`);
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
    console.log(msg);
    const hostPlayer = gameSuite.getPlayer(msg.socketId);
    newImposter.host = hostPlayer.socketId;
    newImposter.players = newImposter.players.concat([hostPlayer]);
    gameSuite.addGame(newImposter, true);
    return newImposter;
  };
  gameSuite.handleSubmitJoinGame = msg => {
    const prospImposter = gameSuite.getGame(msg.gameId.toUpperCase());
    if(!prospImposter) {
      logger.error(`[GS] Could not find game ${msg.gameId}`);
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
    //To-do: make threshold here dingus
    const accusation = gameSuite.makeVote('accusation', msg.accuserId, 'uh', msg.accusedId);
    const newVotes = currGame.votes.concat([accusation]);
    gameSuite.updateGame(msg.gameId, {
      votes: newVotes
    });
    return newVotes;
  };

  //Test routines
  gameSuite.testGameSuite = () => {
    //Count entities
    const countGamesRes = gameSuite.countGames();
    if(countGamesRes !== 0) {
      logger.info('Failed countGames');
      logger.info(countGamesRes);
    } else {
      logger.info(`Pass countGames: ${countGamesRes}`);
    }
    const countPlayersRes = gameSuite.countPlayers();
    if(countPlayersRes !== 0) {
      logger.info('Failed countPlayers');
      logger.info(countPlayersRes);
    } else {
      logger.info(`Pass countPlayers: ${countPlayersRes}`);
    }
    //Add entities and retrieve them
    const newGame = gameSuite.makeGame();
    const newGameId = newGame.gameId;
    const newPlayerId = 'thisisasocketid';
    gameSuite.addGame(newGame);
    gameSuite.addPlayer(gameSuite.makePlayer({}, newPlayerId));
    const getGameRes = gameSuite.getGame(newGameId);
    if(!getGameRes) {
      logger.info('Failed getGame');
      logger.info(getGameRes);
    } else {
      logger.info('Pass getGame');
    }
    const getPlayerRes = gameSuite.getPlayer(newPlayerId);
    if(!getPlayerRes) {
      logger.info('Failed getPlayer');
      logger.info(getPlayerRes);
    } else {
      logger.info('Pass getPlayer');
    }
    const countGamesRes2 = gameSuite.countGames();
    if(countGamesRes2 !== 1) {
      logger.info('Failed countGames');
      logger.info(countGamesRes2);
    } else {
      logger.info(`Pass countGames: ${countGamesRes2}`);
    }
    const countPlayersRes2 = gameSuite.countPlayers();
    if(countPlayersRes2 !== 1) {
      logger.info('Failed countPlayers');
      logger.info(countPlayersRes2);
    } else {
      logger.info(`Pass countPlayers: ${countPlayersRes2}`);
    }
    //Emit command to game

    //Delete entities
    gameSuite.removeGame(newGameId);
    gameSuite.removePlayer(newPlayerId);
  };
  return gameSuite;
};