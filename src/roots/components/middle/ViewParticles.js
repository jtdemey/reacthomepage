import React from 'react';
import Particles from 'react-particles-js';
import { getParticleConfig } from '../../app/surviveUtilities';

class ViewParticles extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.clientWidth !== nextProps.clientWidth || this.props.clientHeight !== nextProps.clientHeight;
	}

	render() {
		return (
	    <Particles 	className={this.props.look}
	    						params={getParticleConfig(parseInt(this.props.mode))}
	    						width={this.props.clientWidth + 'px'}
	    						height={this.props.clientHeight + 'px'} />
	  );
	}
}

export default ViewParticles;