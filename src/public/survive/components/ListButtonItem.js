import React from 'react';
import { connect } from 'react-redux';
import TweenMax from 'gsap/TweenMax';
import { transitionItemOut } from '../actions/uiActions';

class ListButtonItem extends React.Component {
	constructor(props) {
		super(props);
		this.buttonRef = null;
		this.animationFrames = null;
	}

	componentDidUpdate() {
		if(this.props.transitioning === 'out') {
			this.transitionOut();
		}
	}

	transitionOut() {
		this.animationFrames = TweenMax.to(this.buttonRef, 0.15, {
			x: 100,
			opacity: 0,
			ease: Power2.easeOut
		});
	}

	render() {
		return (
	    <li className="list-button-item" ref={el => this.buttonRef = el} onClick={() => this.props.clickFunc(this.props.index)}>
	      {this.props.text}
	    </li>
	  );
	}
}

export default ListButtonItem;