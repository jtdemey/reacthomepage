import {
  cardinalConstants,
  regionConstants,
  temperatureConstants,
  visibilityConstants
} from '../app/surviveConstants';

//Locale creators
export const overwriteForest = (gameMap, overrides = {}) => {
  let locale = {
    name: 'default_locale',
    display: 'Default Locale',
    coordinates: [0, 0],
    region: regionConstants.FOREST,
    temperature: temperatureConstants.NORMAL,
    visibility: visibilityConstants.NORMAL,
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
  };
  let newLoc = {
    ...locale,
    ...overrides
  };
  gameMap[newLoc.name] = newLoc;
};

//Locale modifiers
export const addComments = (locale, text) => {
  if(Array.isArray(text)) {
    for(let i = 0; i < text.length; i++) {
      locale.comments.push(text[i]);
    }
  } else {
    locale.comments.push(text);
  }
};

export const addContainer = (locale, name, locked, contains, loot) => {
  let container = {
    name: name,
    locked: locked,
    contains: contains,
    loot: loot
  };
  locale.containers.push(container);
};

export const addEnemy = (locale, enemyId, chance) => {
  locale.enemies.push([enemyId, chance]);
};

export const addFeature = (locale, name, visThreshold, examineEvent) => {
  let feature = {
    name: name,
    threshold: visThreshold,
    onExamine: examineEvent
  };
  locale.features.push(feature);
};

export const addItem = (locale, name, amount) => {
  let item = createItem(name, amount);
  let p = false;
  let q = 99;
  for(let i = 0; i < locale.items.length; i++) {
    if(locale.items[i].name === item.name) {
      p = true;
      q = i;
    }
  }
  if(p) {
    locale.items[q].count += item.count;
  } else {
    locale.items.push(item);
  }
};

export const addLoot = (locale, name, weight, count) => {
  let loots = [name, weight, count];
  locale.loot.push(loots);
};
  
  //Generation
  /**
        LOCALE REFERENCE

    Coordinates: [x, y, z, isInside]
      -x, y, z: grid coords
      -isInside: boolean, some locales are inside others
    Exits: [direction, locale, delay, phrase]
      -direction: cardinal constant
      -locale: unique name of locale
      -delay: amount of time in ticks it takes to get to the next locale
      -phrase (optional): overrides default exit phrase of locale

  **/
export const createForest = (gameMap) => {
  //Boundaries
  overwriteForest(gameMap, {
    name: 'forest_boundary',
    display: 'Forest Bounds',
    temperature: temperatureConstants.VERY_COLD,
    visibility: visibilityConstants.DIM,
    enterPhrase: "There is an observable line where all vegetation stops, resembling a border.",
    exitPhrase: "You follow your gut feeling and turn back from the border.",
    comments: [
      "The vegetation precisely stops in a straight line.",
      "The silence is deafening."
    ]
  });
  overwriteForest(gameMap, {
    name: 'corn_boundary',
    display: 'Cornfield',
    temperature: temperatureConstants.FREEZING,
    visibility: visibilityConstants.VERY_DARK,
    enterPhrase: "The wind completely stops. It's freezing here.",
    exitPhrase: "You exit the cornfield.",
    comments: [
      "The corn stalks heavily obscure your vision."
    ]
  });
  //Start zone
  overwriteForest(gameMap, {
    name: 'car',
    display: 'Car',
    temperature: temperatureConstants.NORMAL,
    visibility: visibilityConstants.NORMAL,
    enterPhrase: "You sit in the driver's seat.",
    exitPhrase: "Crisp winter air greets you as you open the car door.",
    exits: [
      [cardinalConstants.OUTSIDE, 'car_mailbox', 2]
    ],
    comments: [
      "It's warmer here than outside, but the air is still frigid.",
      "Out of all times and places, why break down tonight?"
    ]
  });
  overwriteForest(gameMap, {
    name: 'car_mailbox',
    display: 'Mailbox',
    coordinates: [7, 7],
    temperature: temperatureConstants.VERY_COLD,
    visibility: visibilityConstants.DIM,
    enterPhrase: [
      "You stand in the center of a snow-covered road.",
      "To the north is a gothic iron archway, leading to a house in the distance."
    ],
    exits: [
      [cardinalConstants.NORTH, 'front_archway', 4, "You head towards the mansion."],
      [cardinalConstants.INSIDE, 'car', 2, "You open the frosty car door and climb in."]
    ],
    comments: [
      "It's warmer here than outside, but the air is still frigid.",
      "Out of all times and places, why break down tonight?"
    ]
  });
  overwriteForest(gameMap, {
    name: 'front_archway',
    display: 'Archway',
    coordinates: [7, 6],
    temperature: temperatureConstants.VERY_COLD,
    visibility: visibilityConstants.DIM,
    enterPhrase: "Two sturdy stone pillars support a frosty iron archway.",
    exits: [
      [cardinalConstants.NORTH, 'front_yard', 4, "You pass the iron gateway and enter the yard."],
      [cardinalConstants.SOUTH, 'car_mailbox', 2, "You head towards your car."]
    ],
    comments: [
      "It's warmer here than outside, but the air is still frigid.",
      "Out of all times and places, why break down tonight?"
    ]
  });
  overwriteForest(gameMap, {
    name: 'front_yard',
    display: 'Front Yard',
    coordinates: [7, 5],
    temperature: temperatureConstants.COLD,
    visibility: visibilityConstants.NORMAL,
    enterPhrase: ["A massive decrepit mansion stands to the north."],
    exits: [
      [cardinalConstants.NORTH, 'front_yard', 4, "You pass the iron gateway and enter the yard."],
      [cardinalConstants.SOUTH, 'car_mailbox', 2, "You head towards your car."],
      [cardinalConstants.EAST, 'front_yard_garden', 3, "You approach the front garden."],
    ],
    comments: [
      "It's warmer here than outside, but the air is still frigid.",
      "Out of all times and places, why break down tonight?"
    ]
  });
  overwriteForest(gameMap, {
    name: 'front_yard_garden',
    display: 'Front Garden',
    coordinates: [8, 5],
    temperature: temperatureConstants.VERY_COLD,
    visibility: visibilityConstants.DIM,
    enterPhrase: [
      "You stand in the center of a snow-covered road.",
      "To the north is a gothic iron archway, leading to a house in the distance."
    ],
    exits: [
      [cardinalConstants.WEST, 'front_yard', 3, "You walk to the front yard."]
    ],
    comments: [
      "It's warmer here than outside, but the air is still frigid.",
      "Out of all times and places, why break down tonight?"
    ]
  });
  return gameMap;
};

/**
    --river border--
    0      1      2      3      4      5      6      7      8      9      10     11     12     13     14     15
0   WOODS1|WOODS2|WOODS3|WOODS4|WOODS5|WOODS6|LCKGT2|000000|000000|000000|000000|000000|DOCKWE|DOCKEA|MUDPND|000000|
1   WOODS7|BUNKER|WOODS8|WOODS9|WOOD10|WOOD11|SERVQ1|SERVQ2|PORCH1|PORCH2|CELARD|LAWN01|COURTN|TREEHO|HEDGE1|000000|
2   WOOD12|WOOD13|WOOD14|WOOD15|WOOD16|WOOD17|KITCHN|HALL00|STUDYN|STAIRD|FLWRBD|COURTW|COURTC|COURTE|HEDGE2|000000|
3   WOOD18|WOOD19|WOOD20|WOOD21|WOOD22|WOOD23|DINING|STAIRU|STUDYS|STORAG|STEPST|LAWN02|COURTS|TOOLSH|HEDGE3|000000|
4   WOOD24|WOOD25|WOOD26|WOOD27|WOOD28|WOOD29|LIVNRM|FOYER0|DEN000|LADDER|LCKGT1|HEDGE4|HEDGE5|HEDGE6|HEDGE7|000000|
5   WOOD30|WOOD31|WOOD32|WOOD33|WOOD34|WOOD35|XXXXXX|FRNTYD|FRNTGD|FYDTRE|XXXXXX|XXXXXX|000000|000000|000000|000000|
6   WOOD37|WOOD38|WOOD39|WOOD40|WOOD41|XXXXXX|XXXXXX|YRDENT|SHED00|WELL00|XXXXXX|XXXXXX|000000|000000|000000|000000|
7   ROAD00|ROAD01|ROAD02|ROAD03|ROAD04|ROAD05|ROAD06|CARMBX|ROAD07|ROAD08|ROAD09|ROAD10|ROAD11|ROAD12|ROAD13|ROAD14|
8   000000|000000|CEMPT1|000000|XXXXXX|XXXXXX|XXXXXX|XXXXXX|XXXXXX|CEMPT3|000000|000000|000000|000000|000000|000000|
9   000000|000000|CEMPT2|000000|000000|000000|000000|000000|000000|CEMPT4|000000|000000|000000|WTCTWR|000000|000000|
10  CEMGT1|CEMGT2|CEMGT3|CEMGT4|CEMGT5|CEMGT6|CEMGT7|CEMGT8|CEMGT9|CEMG10|CEMG11|CEMG12|000000|000000|000000|000000|
11  000000|000000|000000|000000|000000|000000|000000|GRAVE1|GRAVE2|GRAVE3|GRAVE4|CEMG13|000000|POND01|POND02|000000|
12  000000|000000|000000|000000|000000|000000|000000|GRAVE5|GRAVE6|GRAVE7|GRAVE8|CEMG14|000000|POND03|PNDDCK|000000|
13  000000|000000|000000|000000|CHRSUP|CHRCH1|CHRCH2|GRAVE9|GRAV10|GRAV11|GRAV12|CEMG15|000000|POND04|POND05|000000|
14  000000|000000|000000|000000|ALTAR_|CHRCH3|CHRCH4|GRAV13|GRAV14|GRAV15|GRAV16|CEMG16|000000|000000|000000|000000|
15  000000|000000|000000|000000|PASTRQ|CHRCH5|CHRCH6|GRAV17|GRAV18|GRAV19|GRAV20|CEMG17|000000|STABL1|STABL2|000000|
16  000000|000000|000000|000000|000000|000000|000000|GRAV21|GRAV22|GRAV23|GRAV24|CEMG18|000000|000000|000000|000000|
    --cornfield border-- (he who walks between the rows?)

Ideas:
-carcass chance on roadside
-sunset aka passive time when starting?
-different color texts for different "personalities", each remarking on different aspects
**/