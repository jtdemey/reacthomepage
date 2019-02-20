import {
  cardinalConstants,
  regionConstants,
  temperatureConstants,
  visibilityConstants
} from '../app/surviveConstants';

class mapCreator {

  constructor(initialState) {
    this.gameState = initialState;
    this.gameMap = initialState.gameMap;
  }

  //Entity creators
  static addComment(locale, text) {
    this.gameMap[locale].comments.push(text);
  }

  static addContainer(locale, name, locked, contains, loot) {
    let container = {
      name: name,
      locked: locked,
      contains: contains,
      loot: loot
    };
    this.gameMap[locale].containers.push(container);
  }

  static addEnemy(locale, enemyId, chance) {
    this.gameMap[locale].enemies.push([enemyId, chance]);
  }

  static addFeature(locale, name, visThreshold, examineEvent) {
    let feature = {
      name: name,
      threshold: visThreshold,
      onExamine: examineEvent
    };
    this.gameMap[locale].features.push(feature);
  }

  static addItem(locale, name, amount) {
    let item = createItem(name, amount);
    let p = false;
    let q = 99;
    for(let i = 0; i < this.gameMap[locale].items.length; i++) {
      if(this.gameMap[locale].items[i].name === item.name) {
        p = true;
        q = i;
      }
    }
    if(p) {
      this.gameMap[locale].items[q].count += item.count;
    } else {
      this.gameMap[locale].items.push(item);
    }
  }

  static addLocale(name, displayName, coords, exits, region, temperature, visibility, enterPhrase, exitPhrase, comments) {
    let locale = {
      name: name,
      display: displayName,
      coordinates: coords,
      region: region,
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
    }
    this.gameMap[locale.name] = locale;
  }

  static addLoot(locale, name, weight, count) {
    let loots = [name, weight, count];
    this.gameMap[locale].loot.push(loots);
  }

  //Utilities
  static clearCreatorGameMap() {
    this.gameMap = null;
  }
  
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
  static createLocales() {
    //Boundaries
    this.addLocale('forest_boundary',
      'Forest Bounds',                //DISPLAY
      [],                             //COORDINATES
      [],                             //EXITS
      regionConstants.FOREST,         //REGION
      temperatureConstants.VERY_COLD, //TEMPERATURE
      visibilityConstants.DIM,        //VISIBILITY
      "There is an observable line where all vegetation stops, resembling a border.",         //ENTER PHRASE
      "You follow your gut feeling and turn back from the border.",                           //EXIT PHRASE
      ["The vegetation precisely stops in a straight line.", "The silence is saturating."]    //COMMENTS
    );
    this.addLocale('corn_boundary',
      'Cornfield',
      [],
      [],
      regionConstants.FOREST,
      temperatureConstants.FREEZING,
      visibilityConstants.VERY_DARK,
      "The wind completely stops. It's freezing here.",
      "",
      ["The corn stalks heavily obscure your vision."]
    );
    //Start zone
    this.addLocale('car',
      'Car',
      [7, 7],
      [[cardinalConstants.OUTSIDE, 'car_mailbox', 2]],
      regionConstants.FOREST,
      temperatureConstants.FREEZING,
      visibilityConstants.VERY_DARK,
      "You sit in the driver's seat.",
      "Crisp winter air greets you as you open the car door.",
      ["It's warmer here than outside, but the air is still frigid.",
        "Out of all times and places, why break down tonight?"]
    );
    this.addLocale('car_mailbox',
      'Mailbox',
      [7, 7],
      [[cardinalConstants.INSIDE, 'car', 2, "You open the frosty car door and climb in."]],
      regionConstants.FOREST,
      temperatureConstants.FREEZING,
      1,
      "You sit in the driver's seat.",
      "",
      ["It's warmer here than outside, but the air is still frigid.",
        "Out of all times and places, why break down tonight?"]
    );
  }
}

/**
    --river border--
    0      1      2      3      4      5      6      7      8      9      10     11     12     13     14     15
0   WOODS1|WOODS2|WOODS3|WOODS4|WOODS5|WOODS6|LCKGT2|000000|000000|000000|000000|000000|DOCKWE|DOCKEA|MUDPND|000000|
1   WOODS7|BUNKER|WOODS8|WOODS9|WOOD10|WOOD11|SERVQ1|SERVQ2|PORCH1|PORCH2|CELARD|LAWN01|COURTN|TREEHO|HEDGE1|000000|
2   WOOD12|WOOD13|WOOD14|WOOD15|WOOD16|WOOD17|KITCHN|HALL00|STUDYN|STAIRD|FLWRBD|COURTW|COURTC|COURTE|HEDGE2|000000|
3   WOOD18|WOOD19|WOOD20|WOOD21|WOOD22|WOOD23|DINING|STAIRU|STUDYS|STORAG|STEPST|LAWN02|COURTS|TOOLSH|HEDGE3|000000|
4   WOOD24|WOOD25|WOOD26|WOOD27|WOOD28|WOOD29|LIVNRM|FOYER0|DEN000|LADDER|LCKGT1|HEDGE4|HEDGE5|HEDGE6|HEDGE7|000000|
5   WOOD30|WOOD31|WOOD32|WOOD33|WOOD34|WOOD35|WOOD36|FRNTYD|FRNTGD|FYDTRE|000000|000000|000000|000000|000000|000000|
6   WOOD37|WOOD38|WOOD39|WOOD40|WOOD41|WOOD42|WOOD43|PATSHD|SHED00|WELL00|000000|000000|000000|000000|000000|000000|
7   ROAD00|ROAD01|ROAD02|ROAD03|ROAD04|ROAD05|ROAD06|CARMBX|ROAD07|ROAD08|ROAD09|ROAD10|ROAD11|ROAD12|ROAD13|ROAD14|
8   000000|000000|CEMPT1|000000|000000|000000|000000|000000|000000|CEMPT3|000000|000000|000000|000000|000000|000000|
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
**/

export default mapCreator;