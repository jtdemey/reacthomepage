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
    <ViewButton type="console"
                viewIndex={0}
                look={props.currentView === 0 ? "view-btn console-btn active-btn" : "view-btn console-btn"}
                svgdir="../media/tabicon1.svg" />
    <ViewButton type="inventory"
                viewIndex={1}
                look={props.currentView === 1 ? "view-btn inventory-btn active-btn" : "view-btn inventory-btn"}
                svgdir="../media/tabicon2.svg" />
    <ViewButton type="map"
                viewIndex={2}
                look={props.currentView === 2 ? "view-btn map-btn active-btn" : "view-btn map-btn"}
                svgdir="../media/tabicon3.svg" />
    <ViewButton type="status"
                viewIndex={3}
                look={props.currentView === 3 ? "view-btn status-btn active-btn" : "view-btn status-btn"}
                svgdir="../media/tabicon4.svg" />
  </div>
);

const ButtonBarCon = connect(mapStateToProps)(ButtonBar);

export default ButtonBarCon;