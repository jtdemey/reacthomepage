import React from 'react';
import { connect } from 'react-redux';
import GaugeLabel from './GaugeLabel';
import GaugeAmount from './GaugeAmount';
import GaugeFill from './GaugeFill.js';

const mapStateToProps = (state, ownProps) => {
  return {
    amount: state.player[ownProps.type]
  };
};

const StatGauge = (props) => {
	let labelText = 'HP';
	if(props.type === 'energy') {
		labelText = 'EP';
	} else if(props.type === 'sanity') {
		labelText = 'SP';
	}
  return (
    <div className="stat-gauge">
      <GaugeLabel text={labelText} />
      <GaugeAmount amount={props.amount} />
      <GaugeFill type={props.type} amount={props.amount} />
    </div>
  );
};

const StatGaugeC = connect(mapStateToProps)(StatGauge);

export default StatGaugeC;