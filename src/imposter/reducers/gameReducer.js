import { gameActionTypes } from '../actions/actionConstants';

const gameReducer = (state = {}, action) => {
  switch(action.type) {
    case gameActionTypes.ACCUSE_PLAYER:
      return {
        ...state
      };
    case 'ASSIGN_SCENARIO':
      return {
        ...state,
        imposterId: action.imposterId,
        scenario: action.scenario,
        scenarioList: action.scenarioList,
        condition: action.condition,
        roles: action.roles
      };
    case gameActionTypes.CAST_VOTE:
      return {
        ...state,
        castedVotes: state.castedVotes.concat([action.castedVote])
      };
    case gameActionTypes.CLEAR_TEMP_PHASE_DATA:
      return {
        ...state,
        player: {
          ...state.player,
          extendTimerCt: 0,
          hurryUpCt: 0
        }
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
    case gameActionTypes.GAME_TICK:
      return {
        ...state
      };
    case 'GET_NEW_GAME':
      return {
        ...state,
        gameInSession: true,
        gameId: action.gameId,
        host: action.host,
        phase: action.phase,
        players: action.players,
        tick: action.tick
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
    case gameActionTypes.REFRESH_PLAYERS:
        return {
          ...state,
          players: action.players
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
    case gameActionTypes.RETURN_TO_LOBBY:
      return {
        ...state
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
    case 'SUBMIT_JOIN_GAME_FORM':
      return {
        ...state,
        player: {
          ...state.player,
          name: action.playerName
        }
      };
    case 'SYNC_GAME_STATE':
      return {
        ...state,
        gameId: action.gameId,
        gameOverReason: action.gameOverReason,
        isPaused: action.isPaused,
        phase: action.phase,
        players: action.players,
        remainingTime: action.remainingTime,
        tick: action.tick,
        votes: action.votes
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
