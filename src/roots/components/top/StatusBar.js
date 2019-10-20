import React from 'react';
import GameClock from './GameClock';
import StatGaugeBar from './StatGaugeBar';

class StatusBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="status-bar">
        <GameClock />
        <StatGaugeBar />
      </div>
    );
  }
}

export default StatusBar;