import React from 'react';
import {Row, Col, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";

function Page401(props) {
  return (
    <>
      <div className="page401 w-100">
        <Row className="w-100">
          <Col sm={6}>
            <div className="page401__left ">
              {/*<img className="w-100" src={process.env.PUBLIC_URL + 'img/gif/401-Error-Unauthorized_800.gif'} alt=""/>*/}
            </div>
          </Col><Col sm={6} className="d-flex justify-content-center">
          <div className="page401__right text-center my-auto">
            <label className="page401__right-label">Unauthorized</label>
            <h1 className="page401__right-title">Oh No! Error 401</h1>
            <p className="page401__right-subtitle">No authorization found.</p>
            <p className="page401__right-content">
              This page is not publically available.<br/>
              To access it please login first.
            </p>
            <Link className="page401__right-link" to={"/Home"}>Return Home</Link>
          </div>
        </Col>
        </Row>
      </div>
    </>
  );
}

export default Page401;