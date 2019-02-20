import React from 'react';
import { connect } from 'react-redux';
import TweenMax from 'gsap/TweenMax';
import ModalGrid from './ModalGrid';
import {
  transitionEntityIn,
  transitionEntityOut
} from '../../actions/uiActions';

const mapStateToProps = (state, ownProps) => {
  return {
    isModalVisible: state.ui.isModalVisible,
    entitiesTransitioningIn: state.ui.entitiesTransitioningIn,
    entitiesTransitioningOut: state.ui.entitiesTransitioningOut,
    modalMode: state.ui.modalMode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transitionEntityIn: (ent, delay) => {
      dispatch(transitionEntityIn(ent, delay));
    },
    transitionEntityOut: (ent, delay) => {
      dispatch(transitionEntityOut(ent, delay));
    }
  };
};

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = null;
    this.animationFrames = null;
  }

  render() {
    const containerLook = this.props.isModalVisible ? {
      'display': 'block',
      'height': `${this.props.clientHeight + 120}px`
    } : {
      'display': 'none'
    };
    let transition = 'no';
    if(this.props.entitiesTransitioningIn.includes('modal')) {
      transition = 'in';
    } else if(this.props.entitiesTransitioningOut.includes('modal')) {
      transition = 'out';
    }
    return (
      <div className="modal-container" style={containerLook} onClick={() => this.props.transitionEntityOut('modal', 100)}>
        <ModalGrid transitioning={transition} isVisible={this.props.isModalVisible} modalMode={this.props.modalMode} />
      </div>
    );
  }
}

const ModalContainerCon = connect(mapStateToProps, mapDispatchToProps)(ModalContainer);

export default ModalContainerCon;