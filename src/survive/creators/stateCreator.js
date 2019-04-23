let initialState = {
  game: {
    activeSagas: [],
    tick: 0,
    gameTime: new Date(1987, 11, 12, 9, 44, 0, 0).toString(),
    gameClock: undefined,
    paused: false
  },
  player: {
    health: 100, //100-75: healthy, 74-50: injured, 49-25: wounded, 24-10: impaired, 9-1: disabled, 0: dead
    sanity: 100, //100-75: sane, 74-50: afraid, 49-25: panicked, 24-10: delusional, 9-1: insane, 0: irrational
    isDelusional: false,
    isIrrational: false,
    temperature: 100, //150-125: heat exhausted, 124-101: overheated, 100-75: normal, 74-50: chilly, 49-25: cold, 24-10: shivering, 9-1: freezing, 0: game over
    isHeatExhausted: false,
    isShivering: false,
    isFreezing: false,
    energy: 100, //100-75: spry, 74-50: calm, 49-25: tired, 24-10: fatigued, 9-1: exhausted, 0: immobile
    isExhausted: false,
    isImmobile: false,
    locale: 'car',
    lastLocale: undefined,
    visited: [],
    inCombat: false,
    lastCombat: 0,
    currentEnemy: undefined,
    items: [],
    equipped: []
  },
  ui: {
    //Client data
    clientWidth: 0,
    clientHeight: 0,
    //Root GameView
    currentView: 0,
    particleMode: 0,
    viewTransitioningIn: null,
    viewTransitioningOut: null,
    entitiesTransitioningIn: [],
    entitiesTransitioningOut: [],
    //Console View
    lineIndex: 0,
    lastInput: '',
    consoleLines: [],
    consoleYpos: 0,
    commandBarFocus: true,
    //Item View
    localeItemButtons: [],
    inventoryItemButtons: [],
    //Map View
    localeNameGrid: [],
    mapGridItems: [],
    //Modals
    isModalVisible: false,
    modalMode: 0 //0: empty, 1: item-info, 2: combat
  },
  gameMap: {
    car: {
      name: 'car',
      display: 'Car',
      coordinates: [7, 7],
      exits: [],
      enterPhrase: 'You have entered a default locale.',
      exitPhrase: 'You have exited a default locale.',
      comments: [],
      items: [],
      loot: [],
      containers: [],
      features: [],
      enemies: [[null, 50]],
      visits: 0
    }
  }
};

export default initialState;