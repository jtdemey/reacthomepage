import React from 'react';
import { connect } from 'react-redux';
import TweenMax from 'gsap/TweenMax';

class ListButtonItem extends React.Component {
	constructor(props) {
		super(props);
		this.buttonRef = null;
		this.animationFrames = null;
	}

	componentDidMount() {
		if(this.props.transitioning === 'in') {
			this.transitionIn();
		}
	}

	componentDidUpdate() {
		if(this.props.transitioning === 'out') {
			this.transitionOut();
		}
	}

	transitionIn() {
		this.animationFrames = TweenMax.from(this.buttonRef, 0.35, {
			x: 100,
			opacity: 0,
			ease: Power2.easeOut
		});
	}

	transitionOut() {
		this.animationFrames = TweenMax.to(this.buttonRef, 0.15, {
			x: 100,
			opacity: 0,
			ease: Power2.easeOut
		});
	}

	render() {
		const text = this.props.quantity > 1 ? `${this.props.text} (${this.props.quantity})` : this.props.text;
		const cssClass = this.props.isPlaceholder === true ? 'list-button-placeholder' : 'list-button-item';
		const click = this.props.isPlaceholder === true ? () => { return; } : () => this.props.clickFunc(this.props.index);
		return (
	    <li className={cssClass} ref={el => this.buttonRef = el} onClick={click}>
	      {text}
	    </li>
	  );
	}
}

export default ListButtonItem;