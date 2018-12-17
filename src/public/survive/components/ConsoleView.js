import React from 'react';
import { connect } from 'react-redux';
//import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CommandBar from './CommandBar';
import ConsoleLine from './ConsoleLine';
import ConsoleList from './ConsoleList';

const mapStateToProps = (state, ownProps) => {
  return {
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

  return (
    <div className="console-view" style={look}>
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

/**
<TransitionGroup className="line-list-group">
        {props.consoleLines.map((line) => (
          <CSSTransition key={line.id} timeout={300} classNames="line-scroll">
            <ConsoleLine key={line.id} text={line.text} color={line.color} />
          </CSSTransition>
        ))}
      </TransitionGroup>

**/