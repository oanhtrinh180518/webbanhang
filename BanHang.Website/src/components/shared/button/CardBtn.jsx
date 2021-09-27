import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import React from "react";
//Btn Cart
export function BtnShoppingGreen(props) {
  return (
    <>
      <Link to={"/Product"} className="btn-customer-3 btn--green">
        {props.title}
      </Link>
    </>
  );
}
export function BtnClearCart(props) {
  return (
    <>
      <button className="btn-customer-3 btn--black2 " onClick={props.onClick}>
        {props.title}
        <FiShoppingCart className="m-l-5" />
      </button>
    </>
  );
}
export function BtnUpdateCart(props) {
  return (
    <>
      <button
        onClick={props.onClick}
        className="btn-customer-3 btn--update-cart"
      >
        {props.title}
        <FiShoppingCart className="m-l-5" />
      </button>
    </>
  );
}

export function BtnBuyItNow(props) {
  return (
    <>
      <Link to={"/check-out"} className="btn-customer-4 btn--buy-cart">
        {props.title}
      </Link>
    </>
  );
}
export function BtnCheckOut(props) {
  return (
    <>
      <Link
        onClick={props.onClick}
        to={props.path}
        className="btn-customer-4 btn-buy-cart d-block text-center"
      >
        {props.title}
      </Link>
    </>
  );
}
export function BtnContinuedShopping(props) {
  return (
    <>
      <Link
        onClick={props.onClick}
        to={props.path}
        className="btn-customer-3 btn--continued-shopping d-block text-center"
      >
        {props.title}
      </Link>
    </>
  );
}
