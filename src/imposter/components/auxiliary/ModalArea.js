import React from 'react';
import { connect } from 'react-redux';
import RulesModal from './RulesModal';
import SettingsModal from './SettingsModal';
import { toggleModal } from '../../actions/uiActions';

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modalInd => {
      dispatch(toggleModal(modalInd));
    }
  };
};

const ModalArea = props => {
  const css = props.modal > 0 ? 'modal-area' : 'modal-area modal-hidden';
  return (
    <div className={css} onClick={() => { props.toggleModal(0); }}>
      <RulesModal isVisible={props.modal === 1} closeModalFunc={() => props.toggleModal(0)} />
      <SettingsModal isVisible={props.modal === 2} closeModalFunc={() => props.toggleModal(0)} />
    </div>
  );
};

const ModalAreaCon = connect(mapStateToProps, mapDispatchToProps)(ModalArea);

export default ModalAreaCon;