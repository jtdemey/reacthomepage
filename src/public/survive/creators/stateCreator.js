let initialState = {
  game: {
    tick: 0,
    gameTime: new Date(1987, 11, 12, 9, 44, 0, 0).toString()
  },
  player: {
    health: 100,
    sanity: 100, //100-75: sane, 74-50: afraid, 49-25: panicked, 24-10: insane, 9-1: delusional, 0: irrational
    isDelusional: false,
    isIrrational: false,
    temperature: 100, //150-125: heat exhausted, 124-101: overheated, 100-75: normal, 74-50: chilly, 49-25: cold, 24-10: shivering, 9-1: freezing, 0: game over
    isHeatExhausted: false,
    isShivering: false,
    isFreezing: false,
    energy: 100, //100-75: high, 74-50: normal, 49-25: tired, 24-10: fatigued, 9-1: exhausted, 0: immobile
    isExhausted: false,
    isImmobile: false,
    locale: {
      localeId: 0,
      display: `A BIG OL BOX`,
      items: [
        {
          itemId: 0,
          display: 'Test Item',
          quantity: 1
        },
        {
          itemId: 0,
          display: 'Test Item 2',
          quantity: 1
        },
        {
          itemId: 0,
          display: 'Test Item 3',
          quantity: 1
        }
      ]
    },
    lastLocale: undefined,
    visited: [],
    inCombat: false,
    lastCombat: 0,
    currentEnemy: undefined,
    items: [
      {
        itemId: 0,
        display: 'Test Item',
        quantity: 1
      }
    ],
    equipped: []
  },
  ui: {
    //Root GameView
    currentView: 0,
    particleMode: 0,
    viewHeight: 0,
    viewTransitioningIn: null,
    viewTransitioningOut: null,
    //Console View
    lineIndex: 0,
    lastInput: '',
    consoleLines: [],
    consoleYpos: 0,
    commandBarFocus: true,
    //Item View
    localeItemButtons: [],
    inventoryItemButtons: []
  }
};

export default initialState;