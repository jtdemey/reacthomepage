import { viewNames } from './imposterConstants';

export const ajaxPost = (uri, msg) => {
  let req = new XMLHttpRequest();
  req.open('POST', uri, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.setRequestHeader('Access-Control-Allow-Headers', '*');
  req.setRequestHeader('Access-Control-Allow-Origin', '*');
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 0) {
      console.log(`[AJAX] CORS negotiated`);
    } else if (req.readyState === 4 && req.status === 200) {
      console.log(`[AJAX] Received some ${req.responseText}`);
    }
  };
  req.send(msg);
};

export const anyChildEquals = (obj, val) => {
  for(const c in obj) {
    if(obj[c] === val) {
      return true;
    }
  }
  return false;
};

export const determineLiBorderRadius = (listInd, listMax) => {
  let r = false;
  //If first
  if(listInd === 0) {
    r = '0.5em 0.5em 0 0';
  }
  //If last
  if(listInd === (listMax - 1)) {
    r = '0 0 0.5em 0.5em';
  }
  //If first and last
  if(listInd === 0 && listInd === (listMax - 1)) {
    r = '0.5em';
  }
  return r;
};

export const exitToMainMenu = () => {
  const r = window.confirm('This will leave the game - you sure?');
  if(r) {
    location.reload();
  }
  return false;
};

export const getFadeState = (fadingIn, fadingOut, entityId) => {
  if(fadingIn.some(e => e === entityId)) {
    return ' fade-in';
  } else if(fadingOut.some(e => e === entityId)) {
    return ' fade-out';
  }
  return false;
};

export const getPlayerNameFromId = id => {
console.log('uhhhh');
};

export const getThemeColors = themeId => {
  if(themeId === 0) {
    //Crystal
    return {
      primary: '#511C29',
      secondary: '#A62639',
      highlight: '#DB324D'
    };
  } else if(themeId === 1) {
    //Seascape
    return {
      primary: '#1b2c39',
      secondary: '#2d6a68',
      highlight: '#b4ad72'
    };
  } else if(themeId === 2) {
    //Slate
    return {
      primary: '#2a3c3c',
      secondary: '#6e7b6d',
      highlight: '#849c8a'
    };
  } else if(themeId === 3) {
    //Synth
    return {
      primary: '#468387',
      secondary: '#3b3c3b',
      highlight: '#74ba9f'
    };
  } else if(themeId === 4) {
    //Remnant
    return {
      primary: '#41413E',
      secondary: '#88A26F',
      highlight: '#899264'
    };
  }
};

export const getViewIdFromName = v => {
  const k = Object.keys(viewNames).find(x => viewNames[x] === v);
  if(!k) {
    console.error(`Could not get view ID of ${v}`);
  }
  return parseInt(k);
};

export const rollScenario = () => {
  const scenarios = [
    {
      title: 'Animal Hospital',
      roles: [
        'Veterinarian',
        'Anesthesiologist',
        'Janitor',
        'Surgeon',
        'Front Desk Secretary',
        'Biologist',
        'Medical Intern',
        'Medical Engineer',
        'Pharmacologist',
        'Nurse'
      ]
    },
    {
      title: 'Bank Robbers',
      roles: [
        'Mastermind',
        'Demolitionist',
        'Getaway Driver',
        'Weapon Specialist',
        'Technology Specialist',
        'Vault-driller',
        'The Distraction',
        'Recon Specialist',
        'Hostage Taker',
        'Money Bagger'
      ]
    },
    {
      title: 'CIA Headquarters',
      roles: [
        'Mastermind',
        'Demolitionist',
        'Getaway Driver',
        'Weapon Specialist',
        'Technology Specialist',
        'Vault-driller',
        'The Distraction',
        'Recon Specialist',
        'Hostage Taker',
        'Money Bagger'
      ]
    },
    {
      title: 'Diamond Miners',
      roles: {
        0: 'Mine Administrator',
        1: 'Geologist',
        2: 'Elevator Specialist',
        3: 'Surveyor',
        4: 'Miner',
        5: 'Miner',
        6: 'Miner',
        7: 'Geologist',
        8: 'Geologist',
        9: 'Miner'
      }
    },
    {
      title: 'Jungle Safari',
      roles: {
        0: 'Expeditionist',
        1: 'Biologist',
        2: 'Survivalist',
        3: 'Botanist',
        4: 'Hunter',
        5: 'Journalist',
        6: 'Explorer',
        7: 'Translator',
        8: 'Biologist',
        9: 'Photographer'
      }
    },
    {
      title: 'Polar Expeditionists',
      roles: {
        0: 'Head Researcher',
        1: 'Assistant Researcher',
        2: 'Meteorologist',
        3: 'Surveyor',
        4: 'Biologist',
        5: 'Journalist',
        6: 'Explorer',
        7: 'Researcher',
        8: 'Survivalist',
        9: 'Photographer'
      }
    },
    {
      title: 'Aristocratic House Party',
      roles: {
        0: 'Governor',
        1: 'Aristocrat',
        2: 'Snob',
        3: 'Entrepreneur',
        4: 'Duke',
        5: 'Duchess',
        6: 'The Monopoly Guy',
        7: 'Overseer',
        8: 'Senator',
        9: 'Baron'
      }
    },
    {
      title: 'Forest Hobo Camp',
      roles: {
        0: 'Hobo King',
        1: 'Drifter',
        2: 'Beggar',
        3: 'Hippie',
        4: 'Hobo',
        5: 'Drifter',
        6: 'Beggar',
        7: 'Hobo',
        8: 'Hobo',
        9: 'Hobo'
      }
    },
    {
      title: 'ISIS Camp',
      roles: {
        0: 'Interrogator',
        1: 'Executioner',
        2: 'Captain',
        3: 'Demolitionist',
        4: 'Mercenary',
        5: 'Terrorist',
        6: 'Jihadist',
        7: 'Prisoner of War',
        8: 'Captured Journalist',
        9: 'Soldier'
      }
    },
    {
      title: 'Art Museum',
      roles: {
        0: 'Art Snob',
        1: 'Artist',
        2: 'Art Admirer',
        3: 'Security Guard',
        4: 'Curator',
        5: 'Art Critic',
        6: 'Art Collector',
        7: 'Tourist',
        8: 'Art Enthusiast',
        9: 'Artist'
      }
    }
  ];
  const conditions = [
    `Everyone's injured`,
    `Everyone's old`,
    `Everyone has an indiscernable accent`,
    `Everyone's sick`,
    `It's way too hot`,
    `It's way too cold`
  ];
  const scenarioRes = scenarios[Math.floor(Math.random() * scenarios.length)];
  const conditionRes = conditions[Math.floor(Math.random() * conditions.length)];
  return {
    scenario: scenarioRes.title,
    condition: conditionRes,
    roles: scenarioRes.roles
  };
};