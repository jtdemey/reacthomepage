import React from 'react';
import StatGauge from './StatGauge';

const StatGaugeBar = () => (
  <div className="stat-gauge-bar">
    <StatGauge type="health" />
    <StatGauge type="sanity" />
    <StatGauge type="energy" />
  </div>
);

export default StatGaugeBar;