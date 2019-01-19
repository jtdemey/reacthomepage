import React from 'react';
import StatInfoSvg from './StatInfoSvg';
import StatInfoPhrase from './StatInfoPhrase';

const StatInfoTile = (props) => {
	const look = {
		height: `${props.clientHeight / 5}px`
	};
	return (
		<div className="stat-info-tile" style={look}>
			<StatInfoSvg clientWidth={props.clientWidth} clientHeight={props.clientHeight} svgsrc={props.svgsrc} />
			<StatInfoPhrase playerStat={props.playerStat} statPhrase={props.statPhrase} />
	  </div>
	);
};

export default StatInfoTile;