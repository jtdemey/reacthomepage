import React from 'react';

const GaugeLabel = (props) => {
  let look = 'gauge-label health-label';
  let spanlook = 'gauge-stat-label health-stat-label';
  let amtlook = 'gauge-stat-amt health-stat-amt';
  let stat = 'HP';
  if(props.type === 'energy') {
    look = 'gauge-label energy-label';
    spanlook = 'gauge-stat-label energy-stat-label';
    amtlook = 'gauge-stat-amt energy-stat-amt';
    stat = 'EP';
  } else if(props.type === 'sanity') {
    look = 'gauge-label sanity-label';
    spanlook =  'gauge-stat-label sanity-stat-label';
    amtlook = 'gauge-stat-amt sanity-stat-amt';
    stat = 'SP';
  }
  return (
    <div className={look}>
      <h4 className={spanlook}>{stat}</h4><br />
      <h3 className={amtlook}>{props.amount}</h3>
    </div>
  );
};

export default GaugeLabel;