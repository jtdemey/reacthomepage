import React from 'react';
import { connect } from 'react-redux';
import NotificationBox from './NotificationBox';
import { getThemeColors } from '../../app/imposterUtilities';

const mapStateToProps = (state, ownProps) => {
  return {
    notifications: state.ui.notifications,
    theme: state.ui.theme
  };
};

const NotificationArea = props => {
  const look = getThemeColors(props.theme);
  return (
    <div className="notification-area">
      {props.notifications.map((n, i) => (
        <NotificationBox  key={i}
                          bgColor={look.secondary}
                          notificationCt={props.notifications.length}
                          notificationInd={i}
                          isVote={n.isVote}
                          text={n.text} />
      ))}
    </div>
  );
};

const NotificationAreaCon = connect(mapStateToProps)(NotificationArea);

export default NotificationAreaCon;