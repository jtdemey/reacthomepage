import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emitSocketMsg } from '../../actions/gameActions';

//CSS
const getLiCss = isSelected => isSelected ? 'text-center selected-scenario' : 'text-center unselected-scenario';
const getConfirmCss = isDisabled => isDisabled ? ({color: '#777', cursor: 'not-allowed'}) : ({cursor: 'pointer'});

//Events
const getConfirmFunc = (isDisabled, state, dispatch, closeModal, setSelected) => isDisabled ? () => false : () => {
  dispatch(emitSocketMsg({
    command: 'identifyScenario',
    gameId: state.gameId,
    imposterId: state.imposterId,
    scenario: state.scenario
  }));
  setSelected(null);
  closeModal();
};
const getCloseModalFunc = (setSelected, closeModal) => () => {
  setSelected(null);
  closeModal();
};
 
const ScenarioModal = props => {
  const state = useSelector(state => ({
    gameId: state.game.gameId,
    imposterId: state.game.imposterId,
    scenarios: state.game.scenarioList
  }));
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const css = props.isVisible ? 'modal-body fade-in' : 'modal-hidden';
  return (
    <div className={css} onClick={e => e.stopPropagation()}>
      <div className="close-modal-row">
        <span className="close-x"
              onClick={getCloseModalFunc(setSelected, props.closeModalFunc)}>
          <strong>x</strong>
        </span>
      </div>
      <ul className="scenario-list">
        {state.scenarios.map((scenario, i) => (
          <li key={i} className={getLiCss(selected === i)} onClick={() => setSelected(i)}>{scenario}</li>
        ))}
      </ul>
      <div className="scenario-list-btns">
        <div className="scenario-confirm"
             onClick={getConfirmFunc(selected === null, state, dispatch, props.closeModalFunc, setSelected)}
             style={getConfirmCss(selected === null)}>
              Confirm
        </div>
        <div className="scenario-cancel" onClick={getCloseModalFunc(setSelected, props.closeModalFunc)}>Cancel</div>
      </div>
    </div>
  );
};

export default ScenarioModal;