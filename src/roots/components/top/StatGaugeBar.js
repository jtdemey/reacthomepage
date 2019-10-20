import React from 'react';
import StatGauge from './StatGauge';

const StatGaugeBar = () => (
  <div className="stat-gauge-bar">
    <StatGauge type="health" />
    <StatGauge type="energy" />
    <StatGauge type="sanity" />
  </div>
);

export default StatGaugeBar;