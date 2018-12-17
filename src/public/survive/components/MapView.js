import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    consoleLines: state.ui.consoleLines,
    consoleYpos: state.ui.consoleYpos,
    lineIndex: state.ui.lineIndex
  };
};

const MapView = (props) => {
  const look = {
    display: props.isCurrentView ? 'block' : 'none',
    width: props.clientWidth + 'px',
    height: props.clientHeight + 'px'
  };
  return (
    <div className="map-view" style={look}>
    </div>
  );
};

const MapViewCon = connect(mapStateToProps)(MapView);

export default MapViewCon;