import React from 'react';
import { connect } from 'react-redux';
import ModalContainer from '../auxiliary/ModalContainer';
import ViewParticles from './ViewParticles';
import ConsoleView from './ConsoleView';
import MapView from './MapView';
import ItemView from './ItemView';
import InfoView from './InfoView';
import { setClientDimensions } from '../../actions/uiActions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentView: state.ui.currentView,
    viewTransitioningIn: state.ui.viewTransitioningIn,
    viewTransitioningOut: state.ui.viewTransitioningOut
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setClientDimensions: (x, y) => {
      dispatch(setClientDimensions(x, y));
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
    this.props.setClientDimensions(this.state.viewWidth, this.state.viewHeight);
  }

  componentWillMount() {
    this.fitDimensions();
    window.addEventListener('resize', this.fitDimensions.bind(this));
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setClientDimensions(this.state.viewWidth, this.state.viewHeight);
    }, 100);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.fitDimensions.bind(this));
  }

  render() {
    return (
      <div className="game-view" style={{ height: this.state.viewHeight + 'px' }}>
        <ModalContainer />
        <ViewParticles mode="0" look="view-particles" clientWidth={this.state.viewWidth} clientHeight={this.state.viewHeight} />
        <ConsoleView  isCurrentView={this.props.currentView === 0 ? true : false}
                      isTransitioningOut={this.props.viewTransitioningOut === 0 ? true : false} />
        <ItemView isCurrentView={this.props.currentView === 1 ? true : false}
                  isTransitioningOut={this.props.viewTransitioningOut === 1 ? true : false} />
        <MapView isCurrentView={this.props.currentView === 2 ? true : false}
                  isTransitioningOut={this.props.viewTransitioningOut === 2 ? true : false} />
        <InfoView isCurrentView={this.props.currentView === 3 ? true : false}
                  isTransitioningOut={this.props.viewTransitioningOut === 3 ? true : false} />
      </div>
    );
  }
}

const GameViewCon = connect(mapStateToProps, mapDispatchToProps)(GameView);

export default GameViewCon;