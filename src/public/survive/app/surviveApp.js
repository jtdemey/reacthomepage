import React from 'react';
import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';
import GameView from '../components/GameView';
import ButtonBar from '../components/ButtonBar';
import '../styles/surviveLook.css';
import { masterTick } from '../actions/surviveActions';

const mapStateToProps = (state, ownProps) => {
  return {
    tick: state.clock.tick
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    masterTick: (t) => {
      dispatch(masterTick(t));
    }
  };
};

class SurviveApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.clock = setInterval(() => {
      this.props.masterTick(this.props.tick);
    }, 1000);
  }

  render() {
    return (
      <div className="survive-app">
        <StatusBar />
        <GameView />
        <ButtonBar />
      </div>
    );
  }
}

const SurviveAppCon = connect(mapStateToProps, mapDispatchToProps)(SurviveApp);

export default SurviveAppCon;