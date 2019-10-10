import React from 'react';

const ModalButton = props => (
  <div className="modal-btn" onClick={props.onClick}>
    <h5 className="modal-btn-label">
      {props.display}
    </h5>
  </div>
);

export default ModalButton;
