import React from 'react';
import { connect } from 'react-redux';
import MapGrid from './MapGrid';

const mapStateToProps = (state, ownProps) => {
  return {
    clientWidth: state.ui.clientWidth,
    clientHeight: state.ui.clientHeight,
    consoleLines: state.ui.consoleLines,
    consoleYpos: state.ui.consoleYpos,
    lineIndex: state.ui.lineIndex
  };
};

const MapView = (props) => {
  const look = {
    display: props.isCurrentView ? 'flex' : 'none',
    width: props.clientWidth + 'px',
    height: props.clientHeight + 'px'
  };
  return (
    <div className="map-view" style={look}>
      <MapGrid />
    </div>
  );
};

const MapViewCon = connect(mapStateToProps)(MapView);

export default MapViewCon;