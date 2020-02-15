import React from 'react';

const getLbiCss = props => {
  let css = 'list-btn-item';
  if(props.otherClasses) {
    css = `${css} ${props.otherClasses}`;
  }
  return css;
};

const getLbiLook = props => {
  let look = {};
  if(props.rgba) {
    const a = props.rgba;
    look.background = `rgba(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`;
  }
  if(props.look) {
    look = {
      ...look,
      ...props.look
    };
  }
  return look;
};

const ListButtonItem = props => {
  return (
    <div  className={getLbiCss(props)}
          style={getLbiLook(props)}
          onClick={props.clickFunc}>
      <h4 className="lbi-text">{props.text}</h4>
    </div>
  );
};

export default ListButtonItem;
