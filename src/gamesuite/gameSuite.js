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
  const gs = {};

  gs.isIdle = false;
  gs.clock = null;
  gs.db = dbConnection;
  gs.gameModel = gs.db.model('Game', makeGameSchema());
  gs.playerModel = gs.db.model('Player', makePlayerSchema());
  gs.sockets = {};
  gs.timers = {};

  //Creators
  gs.makeCommand = (commName, params = null) => {
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
  gs.makeGame = () => {
    const id = gs.genGameId();
    gs.timers[id] = {
      tick: 0, 
      remainingTime: 10
    };
    return {
      createdOn: new Date().toISOString(),
      gameId: id,
      gameTitle: 'imposter',
      host: null,
      isPaused: false,
      players: [],
      phase: 'lobby',
      remainingTime: 10,
      scenario: null,
      condition: null,
      tick: 0,
      votes: []
    };
  };
  gs.makePlayer = (socket, sockId) => {
    gs.sockets[sockId] = socket;
    return {
      createdOn: new Date().toISOString(),
      extendTimerCt: 0,
      gameId: null,
      hurryUpCt: 0,
      isPlaying: false,
      name: null,
      socketId: sockId
    };
  };
  gs.makeVote = (type, callerId, thresh, accusedId = null) => {
    return {
      voteId: gs.genGameId(),
      voteType: type,
      callerId: callerId,
      accusedId: accusedId,
      yay: 0,
      nay: 0,
      threshold: thresh
    };
  };

  //Utilities
  gs.addTimerData = game => {
    const t = gs.timers[game.gameId];
    if(!t) {
      logger.error(`[GS] Unable to get timer data for ${game.gameId}`);
    }
    return Object.assign(game, t);
  };
  gs.countGames = async () => {
    return gs.gameModel.countDocuments({});
  };
  gs.countPlayers = async () => {
    return gs.playerModel.countDocuments({});
  };
  gs.depleteTimer = (gameId, amt) => {
    gs.timers[gameId].remainingTime -= amt;
  };
  gs.emitToGame = async (gameId, command) => {
    try {
      const players = await gs.playerModel.find({ gameId: gameId }).exec();
      players.forEach(p => {
        const sockId = p.socketId;
        const sock = gs.sockets[sockId];
        if(!sock) {
          logger.error(`[GS] Unable to emit to player ${sockId}: socket data not found`);
        }
        sock.send(command);
      });
    } catch {
      logger.error(`[GS] Unable to emitToGame ${gameId}: player query failed`);
    }
  };
  gs.extendTimer = (gameId, amt) => {
    gs.timers[gameId].remainingTime += amt;
  };
  gs.genGameId = () => {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for(let i = 0; i < 4; i++) {
      const cInd = Math.floor(Math.random() * abc.length);
      const c = abc.charAt(cInd);
      id += c;
    }
    return id;
  };
  gs.parseRes = msg => {
    try {
      const r = JSON.parse(msg);
      return r;
    } catch {
      logger.error(`[GS] Unable to parse client message ${msg}`);
    }
  };
  gs.purgeOldGameData = async (hours = 1) => {
    const now = new Date((new Date().getTime() - (1 * hours * 60 * 60 * 1000)));
    try {
      const res = {
        deletedGames: 0,
        deletedPlayers: 0
      };
      const gct = await gs.countGames();
      if(gct > 0) {
        const oldGames = await gs.gameModel.deleteMany({
          createdOn: { $gte: now }
        }).exec();
        if(oldGames.ok !== 1) {
          logger.error(`[GS] Failed to purge old game data`);
        } else {
          res.deletedGames = oldGames.deletedCount;
          if(res.deletedGames > 0) {
            logger.info(`[GS] Purged ${oldGames.deletedCount} old games`);
          }
        }
      }
      const pct = await gs.countPlayers();
      if(pct > 0) {
        const oldPlayers = await gs.playerModel.deleteMany({
          createdOn: { $gte: now }
        }).exec();
        if(oldPlayers.ok !== 1) {
          logger.error(`[GS] Failed to purge old player data`);
        } else {
          res.deletedPlayers = oldPlayers.deletedCount;
          if(res.deletedPlayers > 0) {
            logger.info(`[GS] Purged ${oldPlayers.deletedCount} old players`);
          }
        }
      }
      return res;
    } catch {
      logger.error(`[GS] Unable to purge old game data`);
    }
  };

  //Getters
  gs.getGame = async gameId => {
    try {
      return gs.gameModel.findOne({gameId: gameId}).exec();
    } catch {
      logger.error(`[GS] Unable to get game ${gameId}`);
    }
  };
  gs.getPlayer = async socketId => {
    return gs.playerModel.findOne({socketId: socketId}).exec();
  };

  //Setters
  gs.updateGame = async (gameId, gameData) => {
    return gs.gameModel.findOneAndUpdate({gameId: gameId}, {...gameData}).exec();
  };
  gs.updatePlayer = async (socketId, playerData) => {
    return gs.playerModel.findOneAndUpdate({socketId: socketId}, {...playerData}).exec();
  };

  //Adders
  gs.addGame = async game => {
    return new gs.gameModel({...game}).save();
  };
  gs.addPlayer = async player => {
    return new gs.playerModel({...player}).save();
  };

  //Deleters
  gs.removeGame = async gameId => {
    return gs.gameModel.deleteOne({gameId: gameId}).exec();
  };
  gs.removePlayer = async socketId => {
    try {
      const game = await gs.gameModel.findOne({
        players: {$elemMatch: {socketId: socketId}}
      }).exec();
      if(game) {
        if(game.players.length < 1) {
          await gs.removeGame(game.gameId);
          logger.info(`[GS] Game ${game.gameId} removed: no players`);
        } else {
          game.players = game.players.filter(p => p.socketId !== socketId);
          await game.save();
        }
      }
    } catch {
      logger.error(`[GS] Unable to query for games containing player ${socketId}`);
    }
    return gs.playerModel.deleteOne({socketId: socketId}).exec();
  };

  //Lifecycle
  gs.doGameTick = game => {
    const t = gs.timers[game.gameId];
    if(!t) {
      logger.error(`[GS] Master tick: unable to get timer data for ${game.gameId}, removing...`);
      gs.removeGame(game.gameId).catch(e => console.error(e));
      return;
    }
    t.tick += 1;
    t.remainingTime -= 1;
    if(t.remainingTime < 0) {
      return gs.iteratePhase(t.tick, game);
    }
    return {
      tick: t.tick,
      remainingTime: t.remainingTime
    }
  };
  gs.iteratePhase = (currTick, game) => {
    let phase;
    let remain;
    switch(game.phase) {
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
        logger.info(`[GS] Unrecognized game phase ${game.phase}`);
        break;
    }
    gs.timers[game.gameId].remainingTime = remain;
    gs.updateGame(game.gameId, {phase: phase}).then(() => {
      logger.info(`[GS] Iterated phase to ${phase} for ${game.gameId}`);
    }).catch(e => {
      logger.error(`[GS] Iterate phase: unable to update active game ${game.gameId}: ${e}`);
    });
    return {
      tick: currTick,
      phase: phase,
      remainingTime: remain
    };
  };
  gs.startGameClock = () => {
    gs.clock = setInterval(async () => {
      let activeGames;
      try {
        activeGames = await gs.gameModel.find({isPaused: false}).exec();
      } catch {
        logger.error(`[GS] Master clock: unable to find active games`);
      }
      if(activeGames) {
        activeGames.forEach(async g => {
          if(g.players.length < 1) {
            try {
              await gs.removeGame(g.gameId);
              logger.info(`[GS] Removed empty game ${g.gameId}`);
            } catch {
              logger.error(`[GS] Master clock: unable to delete empty game ${g.gameId}`);
            }
          }
          const timeData = gs.doGameTick(g);
          const newState = Object.assign(g, timeData);
          try {
            await gs.emitToGame(g.gameId, gs.makeCommand('gameTick', {
              gameState: newState 
            }));
          } catch {
            logger.error(`[GS] Master clock: unable to emit to game ${g.gameId}`);
          }
        });
      } else {
        logger.info('[GS] Going idle...');
        clearInterval(gs.clock);
        gs.startIdleClock();
      }
    }, 1000);
  };
  gs.startIdleClock = () => {
    gs.clock = setInterval(async () => {
      const gct = await gs.countGames();
      if(gct > 0) {
        logger.info(`[GS] Clock's a tickin`);
        clearInterval(gs.clock);
        gs.startGameClock(gs);
      }
    }, 3000);
  };

  //Message Handlers
  gs.handleSubmitHostGame = async msg => {
    const newImposter = gs.makeGame();
    try {
      await gs.updatePlayer(msg.socketId, {
        gameId: newImposter.gameId,
        name: msg.hostName || 'Dingus'
      });
    } catch {
      logger.error(`[GS] Error in host game form submission: could not update host ${msg.socketId}`);
    }
    try {
      const hostPlayer = await gs.getPlayer(msg.socketId);
      newImposter.host = hostPlayer.socketId;
      newImposter.players = newImposter.players.concat([hostPlayer]);
    } catch {
      logger.error(`[GS] Error in host game form submission: could not retrieve host ${msg.socketId}`);
    }
    try {
      await gs.addGame(newImposter, true);
      return newImposter;
    } catch {
      logger.error(`[GS] Error in host game form submission: could not add new game`);
    }
  };
  gs.handleSubmitJoinGame = async msg => {
    let prospImposter;
    try {
      prospImposter = await gs.getGame(msg.gameId.toUpperCase());
      prospImposter = gs.addTimerData(prospImposter);
      console.log('====== prosp ======');
      console.log(prospImposter);
    } catch {
      logger.error(`[GS] Join game submission: could not find game ${msg.gameId}`);
    }
    if(prospImposter.phase !== 'lobby') {
      return {
        error: true,
        msg: 'That game is currently in-session.'
      };
    }
    let joiner;
    try {
      joiner = await gs.getPlayer(msg.socketId);
      joiner.gameId = msg.gameId;
      joiner.name = msg.playerName;
      joiner.isPlaying = true;
    } catch {
      logger.error(`[GS] Join game submission: could not find player ${msg.socketId}`);
    }
    try {
      await gs.updatePlayer(msg.socketId, {
        gameId: msg.gameId,
        name: msg.playerName,
        isPlaying: true
      });
    } catch {
      logger.error(`[GS] Join game submission: could not update player ${msg.socketId}`);
    }
    const newPlayers = prospImposter.players.concat([joiner]);
    prospImposter.players = newPlayers;
    try {
      await gs.updateGame(msg.gameId, {
        players: newPlayers
      });
      return prospImposter;
    } catch {
      logger.error(`[GS] Join game submission: could not update game ${msg.gameId}`);
    }
  };
  gs.handleAccusePlayer = async msg => {
    let currGame;
    try {
      currGame = await gs.getGame(msg.gameId);
      if(currGame.votes.some(v => v.accuserId === msg.accuserId)) {
        return;
      }
    } catch {
      logger.error(`[GS] Accusation: could not get game ${msg.gameId}`);
    }
    //To-do: make threshold here dingus
    const accusation = gs.makeVote('accusation', msg.accuserId, 'uh', msg.accusedId);
    const newVotes = currGame.votes.concat([accusation]);
    try {
      await gs.updateGame(msg.gameId, {
        votes: newVotes
      });
    } catch {
      logger.error(`[GS] Accusation: could not update game ${msg.gameId}`);
    }
    return newVotes;
  };

  //Test routines
  gs.testgs = async () => {
    //To-do: re-write asynchronously
    //Count entities
    const countGamesRes = gs.countGames();
    if(countGamesRes !== 0) {
      logger.info('Failed countGames');
      logger.info(countGamesRes);
    } else {
      logger.info(`Pass countGames: ${countGamesRes}`);
    }
    const countPlayersRes = gs.countPlayers();
    if(countPlayersRes !== 0) {
      logger.info('Failed countPlayers');
      logger.info(countPlayersRes);
    } else {
      logger.info(`Pass countPlayers: ${countPlayersRes}`);
    }
    //Add entities and retrieve them
    const newGame = gs.makeGame();
    const newGameId = newGame.gameId;
    const newPlayerId = 'thisisasocketid';
    gs.addGame(newGame);
    gs.addPlayer(gs.makePlayer({}, newPlayerId));
    const getGameRes = gs.getGame(newGameId);
    if(!getGameRes) {
      logger.info('Failed getGame');
      logger.info(getGameRes);
    } else {
      logger.info('Pass getGame');
    }
    const getPlayerRes = gs.getPlayer(newPlayerId);
    if(!getPlayerRes) {
      logger.info('Failed getPlayer');
      logger.info(getPlayerRes);
    } else {
      logger.info('Pass getPlayer');
    }
    const countGamesRes2 = gs.countGames();
    if(countGamesRes2 !== 1) {
      logger.info('Failed countGames');
      logger.info(countGamesRes2);
    } else {
      logger.info(`Pass countGames: ${countGamesRes2}`);
    }
    const countPlayersRes2 = gs.countPlayers();
    if(countPlayersRes2 !== 1) {
      logger.info('Failed countPlayers');
      logger.info(countPlayersRes2);
    } else {
      logger.info(`Pass countPlayers: ${countPlayersRes2}`);
    }
    //Emit command to game

    //Delete entities
    gs.removeGame(newGameId);
    gs.removePlayer(newPlayerId);
  };
  return gs;
};