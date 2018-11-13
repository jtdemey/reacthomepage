import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    lineIndex: state.ui.lineIndex
  };
};

const ConsoleView = (props) => (
  <div className="console-view">
    <ul className="line-list">
    </ul>
  </div>
);

const ConsoleViewCon = connect(mapStateToProps)(ConsoleView);

export default ConsoleViewCon;