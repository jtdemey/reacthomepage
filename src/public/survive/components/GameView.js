import React from 'react';
import { connect } from 'react-redux';
import ViewParticles from './ViewParticles';
import ConsoleView from './ConsoleView';

const mapStateToProps = (state, ownProps) => {
  return {
    currentView: state.ui.currentView
  };
};

class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewWidth: 400,
      viewHeight: 400
    };
  }

  fitDimensions() {
    let w = window.innerWidth;
    let h = window.innerHeight - 120;
    this.setState({
      viewWidth: w,
      viewHeight: h
    });
  }

  componentWillMount() {
    this.fitDimensions();
    window.addEventListener('resize', this.fitDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.fitDimensions.bind(this));
  }

  render() {
    return (
      <div className="game-view" style={{ height: this.state.viewHeight + 'px' }}>
        <ViewParticles mode="0" look="view-particles" clientWidth={this.state.viewWidth} clientHeight={this.state.viewHeight} />
        <ConsoleView view="0" clientWidth={this.state.viewWidth} clientHeight={this.state.viewHeight} />
      </div>
    );
  }
}

const GameViewCon = connect(mapStateToProps)(GameView);

export default GameViewCon;