import React from 'react';
import GameClock from '../components/GameClock';

class StatusBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="status-bar">
        <GameClock gameTime={this.props.gameTime} />
      </div>
    );
  }
}

export default StatusBar;