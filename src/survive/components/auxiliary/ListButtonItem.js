import React from 'react';
import { useSpring, animated } from 'react-spring';

const ListButtonItem = props => {
	const text = props.quantity > 1 ? `${props.text} (${props.quantity})` : props.text;
	const cssClass = props.isPlaceholder === true ? 'list-button-placeholder' : 'list-button-item';
	const click = props.isPlaceholder === true ? () => { return; } : () => props.clickFunc(props.index);
	return (
		<animated.li className={cssClass} onClick={click}>
			{text}
		</animated.li>
	);
};

export default ListButtonItem;