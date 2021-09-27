import React from 'react';

function ActiveStatusBtn(props) {
  return (
    <>
      <button onClick={props.onClick} className="btn-active-status">
        <img src={props.icon} alt="icons"/>
      </button>
    </>
  );
}

export default ActiveStatusBtn;