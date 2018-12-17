export const formatTime = gt => {
  const s = gt.split(' ');
  const d = (s[0] === 'Sat') ? `${s[0]}urday ` : `${s[0]}day `;
  let t = s[4];
  if(t[0] == '0') {
    t = t.slice(1, t.length);
  }
  return d + t;
};

//Mode: 0 = forest, 1 = mansion, 2 = graveyard
export const getParticleConfig = mode => {
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

export const getTimeFromTick = tick => {
  const s = new Date(1987, 11, 12, 9, 44, 0, 0);
  s.setSeconds((1 * s.getSeconds()) + tick);
  return s.toString();
};

export const iterateTick = (time, tick) => {
  time.setSeconds(time.getSeconds() + (tick + 1));
};