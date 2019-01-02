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
  };

  const createLocales = () => {
    //Boundaries
    addLocale("for_boundary", "Forest Bounds",
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      2, 3,
      "There is an observable line where all vegetation stops, resembling a border.",
      []
    );
    addLocale("corn_boundary", "Cornfield",
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      1, 1,
      "The wind completely stops. It's freezing here.",
      []
    );
  };  
  
  return gameMap;
};

/**
--river border--
WOODS1|WOODS2|WOODS3|WOODS4|WOODS5|WOODS6|LCKGT2|000000|000000|000000|000000|000000|DOCKWE|DOCKEA|MUDPND|000000|
WOODS7|BUNKER|WOODS8|WOODS9|WOOD10|WOOD11|SERVQ1|SERVQ2|PORCH1|PORCH2|CELARD|LAWN01|COURTN|TREEHO|HEDGE1|000000|
WOOD12|WOOD13|WOOD14|WOOD15|WOOD16|WOOD17|KITCHN|HALL00|STUDYN|STAIRD|FLWRBD|COURTW|COURTC|COURTE|HEDGE2|000000|
WOOD18|WOOD19|WOOD20|WOOD21|WOOD22|WOOD23|DINING|STAIRU|STUDYS|STORAG|STEPST|LAWN02|COURTS|TOOLSH|HEDGE3|000000|
WOOD24|WOOD25|WOOD26|WOOD27|WOOD28|WOOD29|LIVNRM|FOYER0|DEN000|LADDER|LCKGT1|HEDGE4|HEDGE5|HEDGE6|HEDGE7|000000|
WOOD30|WOOD31|WOOD32|WOOD33|WOOD34|WOOD35|WOOD36|FRNTYD|FRNTGD|FYDTRE|000000|000000|000000|000000|000000|000000|
WOOD37|WOOD38|WOOD39|WOOD40|WOOD41|WOOD42|WOOD43|PATSHD|SHED00|WELL00|000000|000000|000000|000000|000000|000000|
ROAD00|ROAD01|ROAD02|ROAD03|ROAD04|ROAD05|ROAD06|CARMBX|ROAD07|ROAD08|ROAD09|ROAD10|ROAD11|ROAD12|ROAD13|ROAD14|
000000|000000|CEMPT1|000000|000000|000000|000000|000000|000000|CEMPT3|000000|000000|000000|000000|000000|000000|
000000|000000|CEMPT2|000000|000000|000000|000000|000000|000000|CEMPT4|000000|000000|000000|WTCTWR|000000|000000|
CEMGT1|CEMGT2|CEMGT3|CEMGT4|CEMGT5|CEMGT6|CEMGT7|CEMGT8|CEMGT9|CEMG10|CEMG11|CEMG12|000000|000000|000000|000000|
000000|000000|000000|000000|000000|000000|000000|GRAVE1|GRAVE2|GRAVE3|GRAVE4|CEMG13|000000|POND01|POND02|000000|
000000|000000|000000|000000|000000|000000|000000|GRAVE5|GRAVE6|GRAVE7|GRAVE8|CEMG14|000000|POND03|PNDDCK|000000|
000000|000000|000000|000000|CHRSUP|CHRCH1|CHRCH2|GRAVE9|GRAV10|GRAV11|GRAV12|CEMG15|000000|POND04|POND05|000000|
000000|000000|000000|000000|ALTAR_|CHRCH3|CHRCH4|GRAV13|GRAV14|GRAV15|GRAV16|CEMG16|000000|000000|000000|000000|
000000|000000|000000|000000|PASTRQ|CHRCH5|CHRCH6|GRAV17|GRAV18|GRAV19|GRAV20|CEMG17|000000|STABL1|STABL2|000000|
000000|000000|000000|000000|000000|000000|000000|GRAV21|GRAV22|GRAV23|GRAV24|CEMG18|000000|000000|000000|000000|
--cornfield border-- (he who walks between the rows?)
**/

export default mapCreator;