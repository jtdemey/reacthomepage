export const createListButtonItem = (ind, itemId, display, quantity, isPlaceholder, transitioning, listName) => {
  let newLbi = {
    index: ind,
    itemId: itemId,
    display: display,
    quantity: quantity,
    transitioning: transitioning,
    isPlaceholder: isPlaceholder,
    listName: listName
  };
  return newLbi;
};

export const formatTime = (gt) => {
  const s = gt.split(' ');
  const d = (s[0] === 'Sat') ? `${s[0]}urday ` : `${s[0]}day `;
  let t = s[4];
  if(t[0] == '0') {
    t = t.slice(1, t.length);
  }
  return d + t;
};

export const getListButtonItemFromIndex = (localeItems, inventoryItems, ind) => {
  let itemTarget = null;
  let listNum = 0;
  for(let i = 0; i < localeItems.length; i++) {
    if(localeItems[i].index === ind) {
      itemTarget = localeItems[i];
    }
  }
  for(let i = 0; i < inventoryItems.length; i++) {
    if(inventoryItems[i].index === ind) {
      itemTarget = inventoryItems[i];
      listNum = 1;
    }
  }
  if(itemTarget === null) {
    console.log(`Error in getListButtonItemFromIndex: failed to find item at index ${ind}`);
  }
  return itemTarget;
};

//Mode: 0 = forest, 1 = mansion, 2 = graveyard
export const getParticleConfig = (mode) => {
  let colors = ["#999999", "#b3b3b3", "#bfbfbf", "#d9d9d9", "#538cc6"];
  let dir = "bottom";
  let size = 4;
  let amt = 24;
  if(mode === 1) {
    colors = ["#999999"];
  } else if(mode === 2) {
    colors = ["#999999"];
  }
  return {
    "particles": {
      "number": {
        "value": amt,
        "density": {
          "enable": false
        }
      },
      "color": {
        "value": colors
      },
      "size": {
        "value": 4,
        "random": true,
        "anim": {
          "speed": 4,
          "size_min": 0.3
        }
      },
      "line_linked": {
        "enable": false
      },
      "move": {
        "random": true,
        "speed": 1,
        "direction": dir,
        "out_mode": "out"
      }
    },
    "modes": {
      "bubble": {
        "distance": 300,
        "duration": 2,
        "size": 1,
        "opacity": 0
      },
      "repulse": {
        "distance": 400,
        "duration": 4
      }
    }
  };
};

export const getTimeFromTick = (tick) => {
  const s = new Date(1987, 11, 12, 9, 44, 0, 0);
  s.setSeconds((1 * s.getSeconds()) + tick);
  return s.toString();
};

export const getStatusPhrases = (hp, sp, ep) => {
  let hpPhrase = 'healthy';
  let spPhrase = 'sane';
  let epPhrase = 'spry';
  if(hp < 75 && hp > 49) {
    hpPhrase = 'injured';
  } else if(hp < 50 && hp > 24) {
    hpPhrase = 'wounded';
  } else if(hp < 25 && hp > 9) {
    hpPhrase = 'impaired';
  } else if(hp < 10 && hp > 0) {
    hpPhrase = 'disabled';
  } else if(hp < 1) {
    hpPhrase = 'dead';
  }
  if(sp < 75 && sp > 49) {
    spPhrase = 'afraid';
  } else if(sp < 50 && sp > 24) {
    spPhrase = 'panicked';
  } else if(sp < 25 && sp > 9) {
    spPhrase = 'delusional';
  } else if(sp < 10 && sp > 0) {
    spPhrase = 'insane';
  } else if(sp < 1) {
    spPhrase = 'irrational';
  }
  if(ep < 75 && ep > 49) {
    epPhrase = 'calm';
  } else if(ep < 50 && ep > 24) {
    epPhrase = 'tired';
  } else if(ep < 25 && ep > 9) {
    epPhrase = 'fatigued';
  } else if(ep < 10 && ep > 0) {
    epPhrase = 'exhausted';
  } else if(ep < 1) {
    epPhrase = 'immobile';
  }
  return {
    hpPhrase: hpPhrase,
    spPhrase: spPhrase,
    epPhrase: epPhrase
  };
};

export const iterateTick = (time, tick) => {
  time.setSeconds(time.getSeconds() + (tick + 1));
};