import { viewNames } from './imposterConstants';

export const addAOrAn = str => {
  const vowels = [ ...'aeiou' ];
  if(vowels.some(v => v === str.charAt(0))) {
    return 'an ' + str;
  }
  return 'a ' + str;
};

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

export const detectPlayersDiffs = (ogPlayers, newPlayers) => {
  if(ogPlayers.length !== newPlayers.length) {
    return true;
  }
  let diff = false;
  ogPlayers.forEach((p, i) => {
    const n = newPlayers[i];
    for(let [key, val] of Object.entries(p)) {
      if(key === 'socket') continue;
      if(n[key] !== val) {
        diff = true;
      }
    }
  });
  return diff;
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
  return '';
};

export const getThemeColors = themeId => {
  if(themeId === 0) {
    //Crystal
    return {
      primary: '#39141E',
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
      primary: '#3b3c3b',
      secondary: '#468387',
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