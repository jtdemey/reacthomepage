import React from 'react';
import { connect } from 'react-redux';
import ViewButton from './ViewButton';

const mapStateToProps = (state, ownProps) => {
  return {
    currentView: state.ui.currentView
  };
};

const ButtonBar = (props) => (
  <div className="btn-bar">
    <ViewButton type="console" />
    <ViewButton type="inventory" />
    <ViewButton type="map" />
    <ViewButton type="status" />
  </div>
);

const ButtonBarCon = connect(mapStateToProps)(ButtonBar);

export default ButtonBarCon;