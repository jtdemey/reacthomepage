import React from 'react';
import { connect } from 'react-redux';
import CommandBar from './CommandBar';
import ConsoleLine from './ConsoleLine';
import ConsoleList from './ConsoleList';

const mapStateToProps = (state, ownProps) => {
  return {
    clientWidth: state.ui.clientWidth,
    clientHeight: state.ui.clientHeight,
    consoleLines: state.ui.consoleLines,
    consoleYpos: state.ui.consoleYpos,
    lineIndex: state.ui.lineIndex
  };
};

const ConsoleView = (props) => {
  const look = {
    display: props.isCurrentView ? 'block' : 'none',
    width: props.clientWidth + 'px',
    height: props.clientHeight + 'px'
  };
  const cssClass = props.isTransitioningOut === true ? 'console-view fadeout-slideout' : 'console-view fadein-slidein';

  return (
    <div className={cssClass} style={look}>
      <ConsoleList
        clientWidth={props.clientWidth}
        clientHeight={props.clientHeight}
        consoleLines={props.consoleLines}
        consoleYpos={props.consoleYpos}
        lineIndex={props.lineIndex} />
      <CommandBar />
    </div>
  );
};

const ConsoleViewCon = connect(mapStateToProps)(ConsoleView);

export default ConsoleViewCon;