import React from 'react';
import Particles from 'react-particles-js';
import { getParticleConfig } from '../app/surviveUtilities';

const ViewParticles = props => {
  return (
    <Particles className={props.look} params={getParticleConfig(parseInt(props.mode))} width={props.clientWidth + 'px'} height={props.clientHeight + 'px'} />
  );
};

export default ViewParticles;