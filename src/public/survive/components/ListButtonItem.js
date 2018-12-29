import React from 'react';
import { connect } from 'redux';
import TweenMax from 'gsap/TweenMax';

const mapDispatchToProps = (dispatch) => {
  return {
    transitionViewOut: (nextView) => {
      dispatch(transitionViewOut(nextView));
    }
  };
};

class ListButtonItem extends React.Component {
	constructor(props) {
		super(props);
		this.buttonRef = null;
		this.animationFrames = null;
	}

	transitionOut() {
		this.animationFrames = TweenMax.to(this.buttonRef, 8, {x: 100, opacity: 0});
	}

	render() {
		return (
	    <li className="list-button-item" ref={el => this.buttonRef = el}>
	      {this.props.text}
	    </li>
	  );
	}
}

export default ListButtonItem;