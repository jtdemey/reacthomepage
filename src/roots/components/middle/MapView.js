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

class MapView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.updateMapView();
  }

  render() {
    const look = {
      display: this.props.isCurrentView ? 'flex' : 'none',
      width: this.props.clientWidth + 'px',
      height: this.props.clientHeight + 'px'
    };
    const cssClass = this.props.isTransitioningOut === true ? 'map-view fadeout-slideout' : 'map-view fadein-slidein';
    return (
      <div className={cssClass} style={look}>
        <MapGrid />
      </div>
    );
  }
}

const MapViewCon = connect(mapStateToProps)(MapView);

export default MapViewCon;