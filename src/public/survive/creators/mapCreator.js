const mapCreator = (initialState) => {
  //Map object
  let gameMap = {};

  //Entity creators
  const addContainer = (locale, name, locked, contains, loot) => {
    let container = {
      name: name,
      locked: locked,
      contains: contains,
      loot: loot
    };
    gameMap[locale].containers.push(container);
  };

  const addEnemy = (locale, enemyId, chance) => {
    gameMap[locale].enemies.push([enemyId, chance]);
  };

  const addFeature = (locale, name, visThreshold, examineEvent) => {
    let feature = {
      name: name,
      threshold: visThreshold,
      onExamine: examineEvent
    };
    gameMap[locale].features.push(feature);
  };

  const addItem = (locale, name, amount) => {
    let item = createItem(name, amount);
    let p = false;
    let q = 99;
    for(let i = 0; i < gameMap[locale].items.length; i++) {
      if(gameMap[locale].items[i].name === item.name) {
        p = true;
        q = i;
      }
    }
    if(p) {
      gameMap[locale].items[q].count += item.count;
    } else {
      gameMap[locale].items.push(item);
    }
  };

  const addLocale = (name, displayName, exits, temperature, visibility, enterPhrase, comments) => {
    let locale = {
      name: name,
      display: displayName,
      exits: exits,
      temperature: temperature,
      visibility: visibility,
      enterPhrase: enterPhrase,
      comments: comments,
      items: [],
      loot: [],
      containers: [],
      features: [],
      enemies: [[null, 50]],
      visits: 0
    };
    gameMap[locale.name] = locale;
  };

  const addLoot = (locale, name, weight, count) {
    let loots = [name, weight, count];
    gameMap[locale].loot.push(loots);
  }
};

export default mapCreator;