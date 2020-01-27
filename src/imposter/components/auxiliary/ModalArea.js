import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RulesModal from './RulesModal';
import SettingsModal from './SettingsModal';
import { toggleModal } from '../../actions/uiActions';
import ScenarioModal from '../ingame/ScenarioModal';

const ModalArea = () => {
  const state = useSelector(state => ({
    modal: state.ui.modal
  }));
  const dispatch = useDispatch();
  const clearModals = () => dispatch(toggleModal(0));
  const css = state.modal > 0 ? 'modal-area' : 'modal-area modal-hidden';
  return (
    <div className={css} onClick={() => clearModals()}>
      <RulesModal isVisible={state.modal === 1} closeModalFunc={() => clearModals()} />
      <SettingsModal isVisible={state.modal === 2} closeModalFunc={() => clearModals()} />
      <ScenarioModal isVisible={state.modal === 3} closeModalFunc={() => clearModals()} />
    </div>
  );
};

export default ModalArea;