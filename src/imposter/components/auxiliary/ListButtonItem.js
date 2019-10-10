import React from 'react';

const ListButtonItem = props => {
  const getCss = () => {
    let css = 'list-btn-item';
    if(props.otherClasses) {
      css = `${css} ${props.otherClasses}`;
    }
    return css;
  };
  const getLook = () => {
    let look = {};
    if(props.rgba) {
      const a = props.rgba;
      look = {
        background: `rgba(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`
      };
    }
    if(props.look) {
      look = {
        ...look,
        ...props.look
      };
    }
    return look;
  };
  return (
    <div  className={getCss()}
          style={getLook()}
          onClick={props.clickFunc}>
      <h4 className="lbi-text">{props.text}</h4>
    </div>
  );
};

export default ListButtonItem;
