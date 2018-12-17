import React from 'react';

const ListButtonItem = (props) => {
  return (
    <li className="list-button-item">
      {props.text}
    </li>
  );
};

export default ListButtonItem;