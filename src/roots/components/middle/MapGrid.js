import React from 'react';
import { connect } from 'react-redux';
import MapGridItem from './MapGridItem';
import { updateMapGridItems } from '../../actions/uiActions';

const mapStateToProps = (state, ownProps) => {
  return {
  	clientWidth: state.ui.clientWidth,
    mapGridItems: state.ui.mapGridItems,
    playerLocale: state.player.locale
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMapGridItems: () => {
      dispatch(updateMapGridItems())
    }
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
	    	{this.props.mapGridItems.map(mgi => (
	    		<MapGridItem key={mgi.id} color={mgi.color} display={mgi.display} />
	    	))}
	    </div>
	  );
  }
}

const MapGridCon = connect(mapStateToProps, mapDispatchToProps)(MapGrid);

export default MapGridCon;