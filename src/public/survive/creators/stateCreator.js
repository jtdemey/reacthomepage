let initialState = {
  clock: {
    tick: 0,
    gameTime: new Date(1987, 11, 12, 9, 44, 0, 0).toString()
  },
  player: {
    health: 100,
    //100-75: sane, 74-50: afraid, 49-25: panicked, 24-10: insane, 9-1: delusional, 0: irrational
    sanity: 100,
    isDelusional: false,
    isIrrational: false,
    //150-125: heat exhausted, 124-101: overheated, 100-75: normal, 74-50: chilly, 49-25: cold, 24-10: shivering, 9-1: freezing, 0: game over
    temperature: 100,
    isHeatExhausted: false,
    isShivering: false,
    isFreezing: false,
    //100-75: high, 74-50: normal, 49-25: tired, 24-10: fatigued, 9-1: exhausted, 0: immobile
    energy: 100,
    isExhausted: false,
    isImmobile: false,
    locale: undefined,
    lastLocale: undefined,
    visited: [],
    inCombat: false,
    lastCombat: 0,
    currentEnemy: undefined,
    items: [],
    equipped: []
  },
  ui: {
    currentView: 0,
    particleMode: 0,
    lineIndex: 0,
    lastInput: '',
    consoleLines: [],
    consoleYpos: 0,
    commandBarFocus: true
  }
};

export default initialState;