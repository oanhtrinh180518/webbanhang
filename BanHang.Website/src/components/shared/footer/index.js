import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import FooterTop from "./Footer__Top/FooterTop";
import FooterBottom from "./Footer__Top/FooterBottom";

export default function Footer(props) {

  return(
    <>
      <Container>
        <FooterTop />
        <FooterBottom />
      </Container>
    </>
  )
}