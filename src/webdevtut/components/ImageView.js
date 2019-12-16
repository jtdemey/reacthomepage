import React from 'react';
import { useSpring, animated } from 'react-spring';

const ImageView = props => {
  const { opacity, xyz } = useSpring({
    from: {
      opacity: 0.0,
      xyz: [0, 200, 0]
    },
    to: {
      opacity: 1.0,
      xyz: [0, 0, 0]
    },
    config: {
      mass: 1,
      tension: 320,
      friction: 100
    }
  });
  return (
    <div className="image-view">
      {props.images.map((p, i) => (
        <animated.img key={i} src={p.src} style={{
          opacity: opacity,
          transform: xyz.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
        }} />
      ))}
    </div>
  );
};

export default ImageView;