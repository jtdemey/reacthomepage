import imposterStore from '../store/imposterStore';
import { gameActionTypes } from './actionConstants';

export const accusePlayer = (accuserId, accuserName, accusedId, accusedName, gameId) => {
  return {
    type: gameActionTypes.ACCUSE_PLAYER,
    accuserId: accuserId,
    accuserName,
    accusedId: accusedId,
    accusedName,
    gameId: gameId
  };
};

export const assignScenario = scene => {
  return {
    type: gameActionTypes.ASSIGN_SCENARIO,
    imposterId: scene.imposterId,
    scenario: scene.scenario,
    scenarioList: scene.scenarioList,
    condition: scene.condition,
    roles: scene.roles
  };
};

export const castVote = (isYay, gameId, socketId, voteId) => {
  const castedVote = { voteId, isYay };
  return {
    type: gameActionTypes.CAST_VOTE,
    castedVote,
    isYay,
    gameId,
    socketId,
    voteId
  };
};

export const clearTempPhaseData = () => {
  return {
    type: gameActionTypes.CLEAR_TEMP_PHASE_DATA
  };
};

export const emitSocketMsg = msg => {
  const currGame = imposterStore.getState().game;
  if(!msg.command) {
    console.error('Socket message command undefined');
  }
  if(!msg.socketId) {
    msg.socketId = currGame.socketId;
  }
  try {
    const r = JSON.stringify(msg);
    currGame.socket.send(r);
  } catch(e) {
    console.error('Unable to send socket message', msg, e);
  }
  return {
    type: gameActionTypes.EMIT_SOCKET_MSG,
    msg: msg
  };
};

export const extendTimer = (sockId, gameId, actionCt) => {
  actionCt += 1;
  return {
    type: gameActionTypes.EXTEND_TIMER,
    extendTimerCt: actionCt,
    gameId: gameId,
    socketId: sockId
  };
};

export const gameTick = gs => {
  const currGame = imposterStore.getState().game;
  const deltas = {
    isPaused: currGame.isPaused !== gs.isPaused,
    players: currGame.players !== gs.players,
    phase: currGame.phase !== gs.phase,
    scenario: currGame.scenario !== gs.scenario
  };
  return {
    type: gameActionTypes.GAME_TICK,
    currentPhase: currGame.phase,
    deltas: deltas,
    gameState: gs
  };
};

export const getNewGame = game => {
  return {
    type: gameActionTypes.GET_NEW_GAME,
    game: game
  };
};

export const hurryUp = (sockId, gameId, actionCt) => {
  actionCt += 1;
  return {
    type: gameActionTypes.HURRY_UP,
    hurryUpCt: actionCt,
    gameId: gameId,
    socketId: sockId
  };
};

export const initGame = gameState => {
  return {
    type: gameActionTypes.INIT_GAME,
    gameState: gameState
  };
};

export const refreshVotes = v => {
  return {
    type: gameActionTypes.REFRESH_VOTES,
    votes: v
  };
};

export const resetLobbyActionCounts = () => {
  return {
    type: gameActionTypes.RESET_LOBBY_ACTION_COUNTS
  };
};

export const returnToLobby = (gameId, sockId, playerName) => {
  return {
    type: gameActionTypes.RETURN_TO_LOBBY,
    gameId,
    socketId: sockId,
    playerName
  };
};

export const setPlayerSocket = socket => {
  return {
    type: gameActionTypes.SET_PLAYER_SOCKET,
    playerId: socket.socketId,
    socket: socket
  };
};

export const setSocketId = sockId => {
  const parseDate = isoStr => {
    const b = isoStr.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  };
  const storedId = window.localStorage.getItem('JTD_imposterSocketId');
  const lastSeen = parseDate(window.localStorage.getItem('JTD_imposterHourLastSeen'));
  if(storedId !== null && Math.abs(lastSeen.getHours() - new Date().getHours()) < 2) {
    console.log(`Welcome back, ${storedId}`);
  }
  window.localStorage.setItem('JTD_imposterSocketId', sockId);
  window.localStorage.setItem('JTD_imposterHourLastSeen', new Date().toISOString());
  return {
    type: gameActionTypes.SET_SOCKET_ID,
    socketId: sockId
  };
};

export const submitHostGameForm = (sockId, hostName) => {
  return {
    type: gameActionTypes.SUBMIT_HOST_GAME_FORM,
    hostName: hostName,
    socketId: sockId
  };
};

export const submitJoinGameForm = (sockId, name, gameCode) => {
  return {
    type: gameActionTypes.SUBMIT_JOIN_GAME_FORM,
    playerName: name,
    gameId: gameCode,
    socketId: sockId
  };
};

export const syncGameState = gs => {
  return {
    type: gameActionTypes.SYNC_GAME_STATE,
    gameId: gs.gameId,
    gameOverReason: gs.gameOverReason,
    isPaused: gs.isPaused,
    phase: gs.phase,
    players: gs.players,
    remainingTime: gs.remainingTime,
    tick: gs.tick,
    votes: gs.votes
  };
};

export const updatePlayers = players => {
  return {
    type: gameActionTypes.UPDATE_PLAYERS,
    players: players
  };
};