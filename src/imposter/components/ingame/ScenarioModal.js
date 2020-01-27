import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const getLiCss = isSelected => isSelected ? 'text-center selected-scenario' : 'text-center unselected-scenario';

const getConfirmCss = isDisabled => isDisabled ? ({cursor: 'not-allowed'}) : ({cursor: 'pointer'});

const ScenarioModal = props => {
  const state = useSelector(state => ({
    scenarios: state.game.scenarioList
  }));
  state.scenarios = [
    'iewjoriwjeroiwjeriwej',
    'kdfjnv.dkfjnvkdfjvndfkjnv',
    'woirerupwoeirywuioeyrpu',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
    '8273y48o237y482374y823',
  ];
  const [selected, setSelected] = useState(null);
  const css = props.isVisible ? 'modal-body fade-in' : 'modal-hidden';
  return (
    <div className={css} onClick={e => e.stopPropagation()}>
      <div className="close-modal-row">
        <span className="close-x"
              onClick={props.closeModalFunc}>
          <strong>x</strong>
        </span>
      </div>
      <ul className="scenario-list">
        {state.scenarios.map((scenario, i) => (
          <li key={i} className={getLiCss(selected === i)} onClick={() => setSelected(i)}>{scenario}</li>
        ))}
      </ul>
      <div className="scenario-list-btns">
        <div className="scenario-confirm" style={getConfirmCss(selected === null)}>Confirm</div>
        <div className="scenario-cancel">Cancel</div>
      </div>
    </div>
  );
};

export default ScenarioModal;