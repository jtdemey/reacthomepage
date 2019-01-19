import React from 'react';

const StatInfoPhrase = (props) => {
	const look = {
		width: `${props.clientWidth / 3 * 2}px`
	};
	return (
		<div className="stat-info-phrase" style={look}>
	    <h3 className="stat-info-blurb">
	    	{`You are feeling ${props.statPhrase}.`}
	    </h3>
	  </div>
	);
};

export default StatInfoPhrase;