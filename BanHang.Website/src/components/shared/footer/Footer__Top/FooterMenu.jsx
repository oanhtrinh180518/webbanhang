import React from 'react';
import {Link} from "react-router-dom";
import {Col} from "react-bootstrap";

function FooterMenu(props) {

  // console.log(props.items)

  return (
    <>
      <div className="footer__menu">
        <h4 className="footer__menu-title font-weight-bold">{props.title}</h4>
        <ul className="footer__nav">
          {
            props.items.map((item, index) => (
              <li key={index} className="footer__nav-item">
                <Link to={'/Home'} className="footer__nav-link">{item}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default FooterMenu;
