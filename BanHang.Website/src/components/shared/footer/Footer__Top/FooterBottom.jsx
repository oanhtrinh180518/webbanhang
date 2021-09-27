import React from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function FooterBottom(props) {
  return (
    <>
      <div className="footer__bottom m-t-20 m-b-10">
        <Row>
          <Col xs={12} md={6} lg={8}>
            <p className="footer__right-text">
              Copyright ©
              <Link className={"author"} to={'#'}>Svtt Team</Link>
              .All Rights Reserved
            </p>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className="footer__payment">
              <img src={process.env.PUBLIC_URL + 'img/payment.png'} alt=""/>
            </div>
          </Col>
        </Row>
      </div></>
  );
}

export default FooterBottom;
