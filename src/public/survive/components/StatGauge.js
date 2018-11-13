import React from 'react';
import { connect } from 'react-redux';
import GaugeLabel from './GaugeLabel';
import GaugeFill from './GaugeFill.js';

const mapStateToProps = (state, ownProps) => {
  if(ownProps.type === 'energy') {
    return {
      amount: state.player.energy
    };
  } else if(ownProps.type === 'sanity') {
    return {
      amount: state.player.sanity
    };
  } else {
    return {
      amount: state.player.health
    };
  }
};

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
      <GaugeLabel type={props.type} amount={props.amount} />
      <GaugeFill type={props.type} amount={props.amount} />
    </div>
  );
};

const StatGaugeC = connect(mapStateToProps)(StatGauge);

export default StatGaugeC;