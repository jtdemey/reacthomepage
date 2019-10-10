import React from 'react';
import { determineLiBorderRadius } from '../../app/imposterUtilities';

const NotificationBox = props => {
  const look = {
    background: props.bgColor,
    borderRadius: determineLiBorderRadius(props.notificationInd, props.notificationCt) || '0'
  };
  return (
    <div className="notification-box fade-in" style={look}>
      <p>{props.text}</p>
    </div>
  );
};

export default NotificationBox;