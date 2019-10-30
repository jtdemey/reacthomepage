import { Promise } from 'bluebird';
import logger from '../logs/logWriter';
import makeGameSchema from '../models/Game';
import makePlayerSchema from '../models/Player';

/*
    ref

    db.players.find().pretty()
    db.games.find().pretty()
    db.players.remove({gameId: null})
    db.games.remove({paused: false})
*/

export const makeGameSuite = dbConnection => {
  const gameSuite = {};

  gameSuite.isIdle = false;
  gameSuite.clock = null;
  gameSuite.db = dbConnection;
  gameSuite.gameModel = gameSuite.db.model('Game', makeGameSchema());
  gameSuite.playerModel = gameSuite.db.model('Player', makePlayerSchema());

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
  gameSuite.countGames = async () => {
    return gameSuite.gameModel.countDocuments({});
  };
  gameSuite.countPlayers = async () => {
    return gameSuite.playerModel.countDocuments({});
  };
  gameSuite.emitToGame = async (gameId, command) => {
    try {
      const players = await gameSuite.playerModel.find({ gameId: gameId }).exec();
      players.forEach(p => {
        p.socket.send(command);
      });
    } catch {
      logger.error(`[GS] Unable to emitToGame ${gameId}: player query failed`);
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
  gameSuite.getGame = async gameId => {
    return gameSuite.gameModel.findOne({gameId: gameId}).exec();
  };
  gameSuite.getPlayer = async socketId => {
    return gameSuite.playerModel.findOne({socketId: socketId}).exec();
  };

  //Setters
  gameSuite.updateGame = async (gameId, gameData) => {
    return gameSuite.gameModel.findOneAndUpdate({gameId: gameId}, {...gameData}).exec();
  };
  gameSuite.updatePlayer = async (socketId, playerData) => {
    return gameSuite.playerModel.findOneAndUpdate({socketId: socketId}, {...playerData}).exec();
  };

  //Adders
  gameSuite.addGame = async game => {
    return new gameSuite.gameModel({...game}).save();
  };
  gameSuite.addPlayer = async player => {
    return new gameSuite.playerModel({...player}).save();
  };

  //Deleters
  gameSuite.removeGame = async gameId => {
    return gameSuite.gameModel.remove({gameId: gameId}, {single: true}).exec();
  };
  gameSuite.removePlayer = async socketId => {
    try {
      const game = await gameSuite.gameModel.findOne({
        players: {$elemMatch: {socketId: socketId}}
      }).exec();
      if(game) {
        if(game.players.length < 1) {
          await gameSuite.removeGame(game.gameId);
          logger.info(`[GS] Game ${game.gameId} removed: no players`);
        } else {
          game.players = game.players.filter(p => p.socketId !== socketId);
          await game.save();
        }
      }
    } catch {
      logger.error(`[GS] Unable to query for games containing player ${socketId}`);
    }
    return gameSuite.playerModel.remove({socketId: socketId}, {single: true}).exec();
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
    gameSuite.clock = setInterval(async () => {
      if(gameSuite.countGames() < 1) {
        logger.info('[GS] Going idle...');
        clearInterval(gameSuite.clock);
        gameSuite.startIdleClock();
      }
      const activeGames = await gameSuite.games.find({isPaused: false, players: {$size: 0}}).exec();
      if(activeGames) {
        docs.forEach(g => {
          g = gameSuite.doGameTick(g);
          gameSuite.updateGame(g.gameId, { ...g });
          gameSuite.emitToGame(g.gameId, gameSuite.makeCommand('gameTick', {
            gameState: g
          }));
        });
      }
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