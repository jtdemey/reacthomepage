import { viewConstants } from '../app/imposterConstants';

const initialState = {
  game: {
    alertText: null,
    gameId: null,
    gameInSession: false,
    gameOverReason: null,
    host: null,
    imposterId: null,
    phase: 0,
    player: {
      extendTimerCt: 0,
      hurryUpCt: 0,
      name: 'Some Goon'
    },
    players: [],
    scenario: null,
    scenarioList: [],
    condition: null,
    roles: [],
    socketId: null,
    socket: null,
    tick: 0,
    remainingTime: 60,
    lastSocketCommand: null,
    isPaused: false,
    votes: []
  },
  ui: {
    theme: 4,
    modal: 0, //0:none 1:rules 2:settings 3:scenario
    notifications: [],
    view: viewConstants.MAIN_MENU,
    isAccusing: false,
    isFadingIn: [],
    isFadingOut: []
  }
};

export default initialState;