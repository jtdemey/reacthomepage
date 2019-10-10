import React from 'react';

const SettingSelection = props => {
  return (
    <ul className="setting-selection">
      {props.selections.map(s => (
        <li key={s.key} className={s.css} onClick={() => s.clickEvent()}>{s.text}</li>
      ))}
    </ul>
  );
}

export default SettingSelection;