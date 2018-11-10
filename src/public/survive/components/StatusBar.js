import React from 'react';
import GameClock from '../components/GameClock';
import StatGaugeBar from '../components/StatGaugeBar';

class StatusBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="status-bar">
        <GameClock gameTime={this.props.gameTime} />
        <StatGaugeBar />
      </div>
    );
  }
}

export default StatusBar;