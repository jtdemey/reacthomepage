import React from 'react';
import { connect } from 'react-redux';
import ItemInfoModal from './ItemInfoModal';
import {
  transitionEntityIn,
  transitionEntityOut
} from '../../actions/uiActions';
import { modalModeConstants } from '../../app/surviveConstants';

const mapStateToProps = (state, ownProps) => {
  return {
    clientHeight: state.ui.clientHeight,
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

  getLook() {
    const containerLook = this.props.isModalVisible ? {
      'display': 'block',
      'height': `${this.props.clientHeight + 120}px`
    } : {
      'display': 'none'
    };
    return containerLook;
  }

  getTransitionState() {
    let transition = 'no';
    if(this.props.entitiesTransitioningIn.includes('modal')) {
      transition = 'in';
    } else if(this.props.entitiesTransitioningOut.includes('modal')) {
      transition = 'out';
    }
    return transition;
  }

  render() {
    return (
      <div className="modal-container" style={this.getLook()} onClick={() => this.props.transitionEntityOut('modal', 100)}>
        <ItemInfoModal
          transitioning={this.getTransitionState()}
          isVisible={this.props.modalMode === modalModeConstants.ITEM_INFO}
          modalMode={this.props.modalMode} />
      </div>
    );
  }
}

const ModalContainerCon = connect(mapStateToProps, mapDispatchToProps)(ModalContainer);

export default ModalContainerCon;
