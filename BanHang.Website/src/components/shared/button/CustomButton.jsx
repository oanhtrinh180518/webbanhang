import React from 'react';
import '../../../assets/style/components/_button.scss'
import {Link} from "react-router-dom";

function CustomButton(props) {
  return (
    <>
      <Link
        to={props.to}
        className="custom-button"
      >
        {props.title}
      </Link>
    </>
  );
}

export default CustomButton;