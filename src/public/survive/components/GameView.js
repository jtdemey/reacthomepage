import React from 'react';
import { connect } from 'react-redux';
import ViewParticles from './ViewParticles';
import ConsoleView from './ConsoleView';
import ItemView from './ItemView';
import InfoView from './InfoView';
import { setViewHeight } from '../actions/uiActions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentView: state.ui.currentView,
    viewTransitioningIn: state.ui.viewTransitioningIn,
    viewTransitioningOut: state.ui.viewTransitioningOut
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setViewHeight: (amt) => {
      dispatch(setViewHeight(amt));
    }
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
    let w = window.innerWidth > 800 ? 800 : window.innerWidth;
    let h = window.innerHeight - 120;
    this.setState({
      viewWidth: w,
      viewHeight: h
    });
    this.props.setViewHeight(this.state.viewHeight);
  }

  componentWillMount() {
    this.fitDimensions();
    window.addEventListener('resize', this.fitDimensions.bind(this));
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setViewHeight(this.state.viewHeight);
    }, 800);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.fitDimensions.bind(this));
  }

  render() {
    return (
      <div className="game-view" style={{ height: this.state.viewHeight + 'px' }}>
        <ViewParticles mode="0" look="view-particles" clientWidth={this.state.viewWidth} clientHeight={this.state.viewHeight} />
        <ConsoleView  isCurrentView={this.props.currentView === 0 ? true : false}
                      clientWidth={this.state.viewWidth}
                      clientHeight={this.state.viewHeight}
                      isTransitioningOut={this.props.viewTransitioningOut === 0 ? true : false} />
        <ItemView isCurrentView={this.props.currentView === 1 ? true : false}
                  clientWidth={this.state.viewWidth}
                  clientHeight={this.state.viewHeight}
                  isTransitioningOut={this.props.viewTransitioningOut === 1 ? true : false} />
        <InfoView isCurrentView={this.props.currentView === 3 ? true : false}
                  clientWidth={this.state.viewWidth}
                  clientHeight={this.state.viewHeight}
                  isTransitioningOut={this.props.viewTransitioningOut === 3 ? true : false} />
      </div>
    );
  }
}

const GameViewCon = connect(mapStateToProps, mapDispatchToProps)(GameView);

export default GameViewCon;