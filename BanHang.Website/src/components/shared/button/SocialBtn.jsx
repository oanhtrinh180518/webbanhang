import React from 'react';
import {Link} from "react-router-dom";

function SocialBtn(props) {
  return (
    <>
      <Link
        to={props.link}
        className="btn--social"
      >
        {props.icon}
      </Link>
    </>
  );
}

export default SocialBtn;
