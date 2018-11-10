import React from 'react';
import { connect } from 'react-redux';
import GaugeFill from './GaugeFill.js';

const getCssFromType = (statType) => {
  let look = '';
  if(statType === 'health') {
    look = 'stat-gauge health-bar';
  } else if(statType === 'sanity') {
    look = 'stat-gauge sanity-bar';
  } else if(statType === 'energy') {
    look = 'stat-gauge energy-bar';
  }
  return look;
};

const StatGauge = (props) => {
  return (
    <div className={ getCssFromType(props.type) }>
      <GaugeFill type={props.type} />
    </div>
  );
};

export default StatGauge;