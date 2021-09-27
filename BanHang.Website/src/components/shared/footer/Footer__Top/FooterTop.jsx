import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from "react-router-dom";
import { FaHome, FaPhone, FaFacebookF, FaTwitter, FaYoutube, FaGooglePlusG } from "react-icons/fa";
import { FiMail, FiShoppingCart } from "react-icons/fi";
import SocialBtn from "../../button/SocialBtn";
import FooterMenu from "./FooterMenu";


const menu = [
  {
    title: "Infomation",
    items: [
      "Delivery Information",
      "Advanced Search",
      "Helps & Faqs",
      "Store Location",
      "Orders & Returns",
      "Refund & Returns"
    ]
  },
  {
    title: "Our Company",
    items: [
      "Delivery",
      "Legal Notice",
      "Sitemap",
      "Payment",
      "About us",
      "Carrers"
    ]
  },
  {
    title: "My Account",
    items: [
      "Search Terms",
      "Advanced Search",
      "Contact",
      "Store Location",
      "Orders & Returns",
      "Change password"
    ]
  },
  {
    title: "Opening Time",
    items: [
      "Mon - Fri: 8AM - 10PM",
      "Sat: 9AM-8PM",
      "Suns: 14hPM-18hPM",
      "Mon - Fri: 8AM - 10PM",
      "We Work All The Holidays",
    ]
  }
 ]
function FooterTop(props) {
  return (
    <>
      <div className="footer__top">
        <Row>
          <Col lg={4} md={5}>
            <div className="footer__about">
              <div className="footer__logo">
                <Link to={'/home'} className="footer__logo-link d-block">
                  <img src={process.env.PUBLIC_URL + 'img/logo/oganuceic.png'} alt=""/>
                </Link>
              </div>
              <ul className="footer__address">
                <li className="footer__address-item">
                  <FaHome className="m-r-10"/>
                  Ha Noi, Viet Nam
                </li>
                <li className="footer__address-item">
                  <FaPhone className="m-r-10"/>
                  +84 686 868 999
                </li>
                <li className="footer__address-item">
                  <FiMail className="m-r-10"/>
                  Oganuceic@gmail.com
                </li>
              </ul>
              <ul className="footer__social m-b-20 m-t-20">
                <li className="footer__social-item">
                  <SocialBtn icon={<FaFacebookF/>} link={'/facebook/oganuceic'}/>
                </li>
                <li className="footer__social-item">
                  <SocialBtn icon={<FaTwitter/>} link={'/twitter/oganuceic'}/>
                </li>
                <li className="footer__social-item">
                  <SocialBtn icon={<FaYoutube/>} link={'/youtube/oganuceic'}/>
                </li>
                <li className="footer__social-item">
                  <SocialBtn icon={<FaGooglePlusG/>} link={'/googleplus/oganuceic'}/>
                </li>
              </ul>
            </div>
          </Col>
          {menu.map((x, index) => (
            <Col key={index} xs={12} sm={6} md={3} lg={2}>
              <FooterMenu items={x.items} title={x.title} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default FooterTop;