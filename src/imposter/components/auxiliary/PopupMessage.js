import React from 'react';
import { useSelector } from 'react-redux';
import { getThemeColors } from '../../app/imposterUtilities';

const PopupMessage = () => {
  const text = useSelector(state => state.ui.alertText);
  const theme = useSelector(state => state.ui.theme);
  const colors = getThemeColors(theme);
  const look = {
    display: text != undefined ? 'block' : 'none',
    background: colors.secondary
  };
  return (
    <div className="popup-msg fade-in" style={look}>
      <p>{text}</p>
    </div>
  );
};

export default PopupMessage;