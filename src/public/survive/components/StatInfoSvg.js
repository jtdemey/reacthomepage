import React from 'react';

//Reference:
//	400x400mm
//	Stroke style width 3mm

const StatInfoSvg = (props) => {
	const look = {
		width: `${(props.clientWidth / 5 - 40) < 64 ? 64 : (props.clientWidth / 5 - 40)}px`,
		top: '15%',
		left: '10px'
	};
	return (
		<div className="stat-info-svg">
	    <img className="stat-info-pic" src={props.svgsrc} style={look} />
	  </div>
	);
};

export default StatInfoSvg;