import React from 'react';
import { connect } from 'react-redux';
import SettingSelection from './SettingSelection';
import { changeTheme } from '../../actions/uiActions';

const mapDispatchToProps = dispatch => {
  return {
    changeTheme: themeId => {
      dispatch(changeTheme(themeId));
    }
  };
};

const makeBtn = (n, i, c, e) => {
  return {
    key: n,
    css: i,
    clickEvent: c,
    text: e
  };
};

const SettingsModal = props => {
  const css = props.isVisible ? 'modal-body fade-in' : 'modal-hidden';
  const themeOptions = [
    makeBtn(0, 'crystal-btn', () => props.changeTheme(0), 'Crystal'),
    makeBtn(1, 'seascape-btn', () => props.changeTheme(1), 'Seascape'),
    makeBtn(2, 'slate-btn', () => props.changeTheme(2), 'Slate'),
    makeBtn(3, 'synth-btn', () => props.changeTheme(3), 'Synth'),
    makeBtn(4, 'remnant-btn', () => props.changeTheme(4), 'Remnant')
  ];
  return (
    <div className={css} onClick={e => e.stopPropagation()}>
      <div className="close-modal-row">
        <span className="close-x"
              onClick={props.closeModalFunc}>
          <strong>x</strong>
        </span>
      </div>
      <div className="settings-content-area">
        <h2>Settings</h2>
        <h4>Theme</h4>
        <SettingSelection selections={themeOptions} />
      </div>
    </div>
  );
};

const SettingsModalCon = connect(null, mapDispatchToProps)(SettingsModal);

export default SettingsModalCon;