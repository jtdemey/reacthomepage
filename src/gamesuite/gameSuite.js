import logger from '../logs/logWriter';
import { rollScenario } from './imposter';

export const makeGameSuite = () => {
  const gameSuite = {};

  gameSuite.isIdle = false;
  gameSuite.clock = null;
  gameSuite.gameList = [];
  gameSuite.playerList = [];

  //Logs
  const logInfo = (msg, gameId = null) => {
    logger.info(`[GS] ${gameId ? `[${gameId}] ` : ''}${msg}`);
  };

  const logError = (err, gameId = null) => {
    logger.error(`[GS] ${gameId ? `[${gameId}] ` : ''}${err}`);
  };

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
      gameOverReason: null,
      host: null,
      imposterId: null,
      isPaused: false,
      players: [],
      phase: 'lobby',
      remainingTime: 10, //To-do: change this
      scenario: null,
      scenarioList: [],
      condition: null,
      roles: [], 
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

  gameSuite.makeVote = (type, callerId, callerName, threshold, accusedId = null, accusedName = null) => {
    return {
      voteId: gameSuite.genVoteId(),
      voteType: type,
      callerId: callerId,
      callerName,
      accusedId: accusedId,
      accusedName,
      tick: 15,
      threshold,
      yay: 0,
      nay: 0
    };
  };

  //Utilities
  gameSuite.emitToGame = (gameId, command, debug = false) => {
    const gamePlayers = gameSuite.playerList.filter(p => p.gameId && p.gameId === gameId);
    for(let j = 0; j < gamePlayers.length; j++) {
      if(debug) {
        logInfo(`Sending ${JSON.parse(command).command} to ${gamePlayers[j].socketId}`);
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

  gameSuite.genVoteId = () => {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let id = '';
    for(let i = 0; i < 8; i++) {
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
      logError(`Unable to parse client message ${msg}`);
    }
  };

  //Getters
  gameSuite.getGame = gameId => {
    const r = gameSuite.gameList.filter(g => g.gameId === gameId)[0];
    if(r.length === 0) {
      logError(`Could not get game ${gameId}`);
    }
    return r;
  };

  gameSuite.getPlayer = socketId => {
    const r = gameSuite.playerList.filter(p => p.socketId === socketId)[0];
    if(r.length === 0) {
      logError(`Could not get player ${socketId}`);
    }
    return r;
  };

  //Setters
  gameSuite.updateGame = (gameId, gameData) => {
    let g = gameSuite.getGame(gameId.toUpperCase());
    if(!g) {
      logError(`Could not update game ${gameId}`);
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
      logError(`Could not update player ${socketId}`);
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
      logInfo(`Added game ${game.gameId} (Total: ${gameSuite.gameList.length})`);
    }
  };

  gameSuite.addPlayer = (player, debug = false) => {
    gameSuite.playerList = gameSuite.playerList.concat([player]);
    if(debug) {
      logInfo(`Added player ${player.socketId} (Total: ${gameSuite.playerList.length})`);
    }
  };

  //Deleters
  gameSuite.removeGame = (gameId, debug = false) => {
    const r = gameSuite.gameList.filter(g => g.gameId !== gameId);
    gameSuite.gameList = r;
    if(debug) {
      logInfo(`Removed game ${gameId} (Total: ${gameSuite.gameList.length})`);
    }
  };

  gameSuite.removePlayer = (socketId, debug = false) => {
    const activeGame = gameSuite.gameList.filter(g => g.players.some(p => p.socketId === socketId))[0];
    if(!activeGame) {
      logError(`Unable to find game for disconnected player ${socketId}`);
      return;
    }
    if(activeGame.players.length <= 1) {
      gameSuite.removeGame(activeGame.gameId);
      logInfo(`Removed empty game ${activeGame.gameId} (Total: ${gameSuite.gameList.length})`);
    } else {
      gameSuite.updateGame(activeGame.gameId, {
        players: activeGame.players.filter(p => p.socketId !== socketId)
      });
    }
    gameSuite.playerList = gameSuite.playerList.filter(p => p.socketId !== socketId);
    if(debug) {
      logInfo(`Removed player ${socketId} (Total: ${gameSuite.playerList.length})`);
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
    if(g.votes.length > 0) {
      g.votes = g.votes.map(v => ({ ...v, tick: v.tick - 1 })).filter(v => v.tick > 0);
    }
    return g;
  };

  gameSuite.iteratePhase = game => {
    let g = { ...game };
    switch(g.phase) {
      case 'lobby':
        g.phase = 'in-game';
        g.remainingTime = 240;
        g = gameSuite.applyScenario(g, rollScenario());
        break;
      case 'in-game':
        g.phase = 'imposter-victory';
        g.remainingTime = 20;
        break;
      case 'bystander-victory':
      case 'imposter-victory':
        g.phase = 'lobby';
        g.remainingTime = 60;
        break;
      default:
        logInfo(`Unrecognized game phase ${g.phase}`);
        break;
    }
    return g;
  };

  gameSuite.startGameClock = () => {
    gameSuite.clock = setInterval(() => {
      if(gameSuite.gameList.length < 1) {
        logInfo('Going idle...');
        clearInterval(gameSuite.clock);
        gameSuite.startIdleClock(gameSuite);
      }
      const activeGames = gameSuite.gameList.filter(g => g.isPaused === false && g.players.length > 0);
      //logger.debug(gameSuite.gameList[0].players.length);
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
        logInfo(`Bootin' up!`);
        clearInterval(gameSuite.clock);
        gameSuite.startGameClock(gameSuite);
      }
    }, 3000);
  };

  //Form Handlers
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
    logInfo(`Host game submitted by ${msg.socketId}`);
    return newImposter;
  };

  gameSuite.handleSubmitJoinGame = msg => {
    const prospImposter = gameSuite.getGame(msg.gameId.toUpperCase());
    gameSuite.updatePlayer(msg.socketId, {
      gameId: msg.gameId.toUpperCase(),
      name: msg.playerName
    });
    const joiner = gameSuite.getPlayer(msg.socketId);
    const newPlayers = prospImposter.players.concat([joiner]);
    gameSuite.updateGame(msg.gameId, {
      players: newPlayers
    });
    logInfo(`Join game submitted by ${msg.socketId}`);
    return {
      ...prospImposter,
      players: newPlayers
    };
  };

  //Events
  gameSuite.applyScenario = (state, scene) => {
    const result = {
      ...state,
      imposterId: null,
      scenario: scene.scenario,
      scenarioList: scene.scenarioList,
      condition: scene.condition,
      roles: []
    };
    const randomId = state.players[Math.floor(Math.random() * state.players.length)].socketId;
    logInfo(`Assigned imposter to ` + randomId, state.gameId);
    result.imposterId = randomId;
    result.roles.push({
      socketId: randomId,
      role: 'the imposter'
    });
    state.players.forEach(p => {
      if(p.socketId !== randomId) {
        const role = scene.roles[Math.floor(Math.random() * scene.roles.length)];
        result.roles.push({
          socketId: p.socketId,
          role
        });
        scene.roles = scene.roles.filter(r => r !== role);
      }
    });
    logInfo(`Applied scenario ${scene.scenario} to ${state.gameId}`);
    return result;
  };

  gameSuite.castVote = msg => {
    const currVotes = gameSuite.getGame(msg.gameId).votes;
    const vote = currVotes.filter(v => v.voteId === msg.voteId)[0];
    if(!vote) {
      logError(`Cast vote: Unable to find vote ${msg.voteId} in ${msg.gameId}`);
    }
    if(msg.isYay) {
      vote.yay += 1;
    } else {
      vote.nay += 1;
    }
    if(vote.yay >= vote.threshold) {
      if(vote.voteType === 'lobby') {
        gameSuite.updateGame(msg.gameId, {
          phase: 'lobby',
          remainingTime: 60,
          votes: []
        });
      } else if(vote.voteType === 'accusation') {
        gameSuite.updateGame(msg.gameId, {
          phase: 'imposter-victory',
          remainingTime: 20,
          votes: []
        });
      }
    } else {
      gameSuite.updateGame(msg.gameId, {
        votes: currVotes.filter(v => v.voteId !== msg.voteId).concat([vote]) 
      });
    }
    logInfo(`${msg.gameId}: ${msg.socketId} voted ${msg.isYay ? 'yay' : 'nay'} on vote ${msg.voteId} (${vote.voteType})`);
  };

  gameSuite.handleAccusePlayer = msg => {
    const currGame = gameSuite.getGame(msg.gameId);
    if(msg.accuserId === msg.accusedId || currGame.votes.some(v => v.callerId === msg.accuserId)) {
      return;
    }
    const callerName = currGame.players.filter(p => p.socketId === msg.accuserId)[0].name;
    if(!callerName) {
      logError(`Accuse player: Unable to find player name for accuser ${msg.accuserId}`);
    }
    const accusedName = currGame.players.filter(p => p.socketId === msg.accusedId)[0].name;
    if(!accusedName) {
      logError(`Accuse player: Unable to find player name for accused ${msg.accuserId}`);
    }
    const thresh = currGame.players.length - 1 < 1 ? 1 : currGame.players.length - 1;
    const accusation = gameSuite.makeVote('accusation', msg.accuserId, callerName, thresh, msg.accusedId, accusedName);
    const newVotes = currGame.votes.concat([accusation]);
    gameSuite.updateGame(msg.gameId, {
      votes: newVotes
    });
    gameSuite.emitToGame(currGame.gameId, gameSuite.makeCommand('refreshVotes', {
      votes: newVotes
    }));
    logInfo(`${msg.gameId}: ${msg.accuserId} accuses ${msg.accusedId}`);
  };

  gameSuite.handleLobbyReturnVote = msg => {
    const currGame = gameSuite.getGame(msg.gameId);
    if(currGame.votes.some(v => v.callerId === msg.socketId)) {
      return;
    }
    const callerName = currGame.players.filter(p => p.socketId === msg.socketId)[0].name;
    if(!callerName) {
      logError(`Return to lobby: Unable to find player name for ${msg.socketId}`);
    }
    const thresh = currGame.players.length - 1 < 1 ? 1 : currGame.players.length - 1;
    const vote = gameSuite.makeVote('lobby', msg.socketId, callerName, thresh);
    const newVotes = currGame.votes.concat([vote]);
    gameSuite.updateGame(msg.gameId, {
      votes: newVotes
    });
    gameSuite.emitToGame(currGame.gameId, gameSuite.makeCommand('refreshVotes', {
      votes: newVotes
    }));
    logInfo(`${msg.gameId}: ${msg.socketId} votes to return to the lobby`);
  };

  gameSuite.extendTimer = (sockId, gameId) => {
    const game = gameSuite.getGame(gameId);
    game.remainingTime += 10;
    logInfo(`${sockId} extended timer for ${gameId}`);
  };

  gameSuite.hurryUp = (sockId, gameId) => {
    const game = gameSuite.getGame(gameId);
    game.remainingTime -= 1;
    logInfo(`${sockId} depleted timer for ${gameId}`);
  };

  gameSuite.identifyScenario = msg => {
    //To-do: this ain't catching correct guesses
    console.log(msg);
    const game = gameSuite.getGame(msg.gameId);
    const imposter = game.players.filter(p => p.socketId === msg.imposterId);
    const imposterName = imposter.name || 'The Imposter';
    if(imposter.length < 1) {
      logError(`Identify scenario: unable to find imposter with ID ${msg.imposterId}`);
    }
    if(game.scenario === msg.scenario) {
      gameSuite.updateGame(msg.gameId, {
        gameOverReason: `${imposterName} identified your scenario.`,
        phase: 'imposter-victory',
        remainingTime: 15
      });
      logInfo(`Imposter for ${msg.gameId} guessed correct scenario`);
    } else {
      gameSuite.updateGame(msg.gameId, {
        gameOverReason: `${imposterName} done goofed and guessed the wrong scenario.`,
        phase: 'bystander-victory',
        remainingTime: 15
      });
      logInfo(`Imposter for ${msg.gameId} guessed the wrong scenario`);
    }
  };

  return gameSuite;
};