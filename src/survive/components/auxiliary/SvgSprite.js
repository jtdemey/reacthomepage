import React from 'react';
import { connect } from 'react-redux';
import {
  transitionEntityIn,
  transitionEntityOut
} from '../../actions/uiActions';

const mapStateToProps = (state, ownProps) => {
  return {
    entitiesTransitioningIn: state.ui.entitiesTransitioningIn,
    entitiesTransitioningOut: state.ui.entitiesTransitioningOut
  };
};

class SvgSprite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      srcLoading: false,
      srcLoaded: false
    };
  }

  componentDidMount() {}

  getTransitionState() {
    let transition = 'no';
    if(this.props.entitiesTransitioningIn.includes(this.props.fileName)) {
      transition = 'in';
    } else if(this.props.entitiesTransitioningOut.includes(this.props.fileName)) {
      transition = 'out';
    }
    return transition;
  }

  render() {
    return (
      <div className="svg-container" onClick={() => this.props.transitionEntityOut(this.props.filename, 100)}>
        <img src={this.props.fileName} className="svg-sprite" />
      </div>
    );
  }
}

const SvgSpriteCon = connect(mapStateToProps)(SvgSprite);

export default SvgSpriteCon;
