import React from 'react';
import { connect } from 'react-redux';
import MapGridItem from './MapGridItem';

const mapStateToProps = (state, ownProps) => {
  return {
  	clientWidth: state.ui.clientWidth,
    mapGridItems: state.ui.mapGridItems,
    playerLocale: state.player.locale
  };
};

class MapGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
  	return this.props.playerLocale != nextProps.playerLocale || this.props.clientWidth != nextProps.clientWidth;
  }

  render() {
  	const look = {
  		height: `${this.props.clientWidth * 0.95}px`
  	};
    return (
	    <div className="map-grid" style={look}>
	    	{this.props.mapGridItems.map((gi) => (
	    		<MapGridItem key={gi.gridItemId} />
	    	))}
	    </div>
	  );
  }
}

const MapGridCon = connect(mapStateToProps)(MapGrid);

export default MapGridCon;