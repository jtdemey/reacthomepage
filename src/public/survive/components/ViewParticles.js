import React from 'react';
import Particles from 'react-particles-js';

//Mode: 0 = forest, 1 = mansion, 2 = graveyard
const getParticleConfig = mode => {
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

const ViewParticles = props => {
  return (
    <Particles className={props.look} params={getParticleConfig(parseInt(props.mode))} width={props.clientWidth + 'px'} height={(props.clientHeight - 32) + 'px'} />
  );
};

export default ViewParticles;