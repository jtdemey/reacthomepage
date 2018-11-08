import React from 'react';
import StatusBar from '../components/StatusBar';
import '../styles/surviveLook.css';

class SurviveApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tick: 1,
      gameTime: new Date(1987, 11, 13, 2, 44, 0, 0).toString(),
      next: null,
      operation: null
    };
  }

  handleClick = buttonName => {
    return;
  };

  render() {
    return (
      <div className="survive-app">
        <StatusBar gameTime={this.state.gameTime} />
      </div>
    );
  }
}

export default SurviveApp;