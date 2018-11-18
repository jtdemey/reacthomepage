import React from 'react';
import StatGauge from './StatGauge';

const StatGaugeBar = () => (
  <div className="stat-gauge-bar">
    <StatGauge type="health" look="stat-gauge health-bar" />
    <StatGauge type="energy" look="stat-gauge energy-bar" />
    <StatGauge type="sanity" look="stat-gauge sanity-bar" />
  </div>
);

export default StatGaugeBar;