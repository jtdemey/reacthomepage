import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    consoleLines: state.ui.consoleLines,
    consoleYpos: state.ui.consoleYpos,
    lineIndex: state.ui.lineIndex
  };
};

const StatusView = (props) => {
  const look = {
    display: props.isCurrentView ? 'block' : 'none',
    width: props.clientWidth + 'px',
    height: props.clientHeight + 'px'
  };
  return (
    <div className="status-view" style={look}>
    </div>
  );
};

const StatusViewCon = connect(mapStateToProps)(StatusView);

export default StatusViewCon;