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

const StatGauge = (props) => {
  return (
    <div className={props.look}>
      <GaugeLabel type={props.type} amount={props.amount} />
      <GaugeFill type={props.type} amount={props.amount} />
    </div>
  );
};

const StatGaugeC = connect(mapStateToProps)(StatGauge);

export default StatGaugeC;