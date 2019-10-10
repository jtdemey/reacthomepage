import { gameActionTypes } from '../actions/actionConstants';

const gameReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ACCUSE_PLAYER':
      return {
        ...state
      };
    case 'EMIT_SOCKET_MSG':
      return {
        ...state,
        lastSocketCommand: action.command
      };
    case 'EXTEND_TIMER':
      return {
        ...state,
        player: {
          ...state.player,
          extendTimerCt: action.extendTimerCt
        }
      };
    case 'GET_NEW_GAME':
      return {
        ...state,
        gameInSession: true,
        gameId: game.gameId,
        host: game.host,
        phase: game.phase,
        players: game.players,
        tick: game.tick
      };
    case 'HURRY_UP':
      return {
        ...state,
        player: {
          ...state.player,
          hurryUpCt: action.hurryUpCt
        }
      };
    case 'INIT_GAME':
      return {
        ...state,
        gameInSession: true
      };
    case gameActionTypes.REFRESH_VOTES:
        return {
          ...state,
          votes: action.votes
        };
    case gameActionTypes.RESET_LOBBY_ACTION_COUNTS:
      return {
        ...state,
        player: {
          ...state.player,
          extendTimerCt: 0,
          hurryUpCt: 0
        }
      };
    case 'SEND_HOST_GAME_REQUEST':
      return {
        ...state
      };
    case 'SET_PLAYER_SOCKET':
      return {
        ...state,
        socket: action.socket
      };
      case 'SET_SOCKET_ID':
        return {
          ...state,
          socketId: action.socketId
        };
    case 'SUBMIT_HOST_GAME_FORM':
      return {
        ...state,
        player: {
          ...state.player,
          name: action.hostName
        }
      };
    case 'SYNC_GAME_STATE':
      return {
        ...state,
        gameId: action.gameId,
        isPaused: action.isPaused,
        phase: action.phase,
        players: action.players,
        remainingTime: action.remainingTime,
        tick: action.tick
      };
    case 'UPDATE_PLAYERS':
      return {
        ...state,
        players: action.players
      };
    default:
      return state;
  }
};

export default gameReducer;
