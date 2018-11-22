import React from 'react';
import { connect } from 'react-redux';
import CommandBar from './CommandBar';
import ConsoleLine from './ConsoleLine';

const mapStateToProps = (state, ownProps) => {
  return {
    consoleLines: state.ui.consoleLines,
    lineIndex: state.ui.lineIndex
  };
};

const ConsoleView = (props) => (
  <div className="console-view" style={{ width: props.clientWidth + 'px', height: props.clientHeight + 'px' }}>
    <ul className="line-list" style={{ width: props.clientWidth + 'px', height: (props.clientHeight - 32) + 'px' }} >
      {props.consoleLines.map((line) => (
        <ConsoleLine key={line.id} {...line} />
      ))}
    </ul>
    <CommandBar />
  </div>
);

const ConsoleViewCon = connect(mapStateToProps)(ConsoleView);

export default ConsoleViewCon;