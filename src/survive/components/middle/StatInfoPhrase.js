import React from 'react';

const StatInfoPhrase = (props) => {
	const look = {
		width: `${props.clientWidth / 3 * 2}px`
	};
	const display = props.tileId === 1 ? `Your mind feels ${props.statPhrase}.` : `You feel ${props.statPhrase}.`;
	return (
		<div className="stat-info-phrase" style={look}>
	    <h3 className="stat-info-blurb">
	    	{display}
	    </h3>
	  </div>
	);
};

export default StatInfoPhrase;