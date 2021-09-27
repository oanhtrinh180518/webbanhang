import React from "react";
// import '../../../assets/style/components/_button.scss'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import classNames from "classnames";

export function CustomBtn2(props) {
  return (
    <>
      <Link to="#" className="custom-button-2">
        {props.title}
        <FaLongArrowAltRight className="m-l-5" />
      </Link>
    </>
  );
}

export function BtnBlack(props) {
  return (
    <>
      <Link to={"/products"} className="btn-customer-3 btn--black">
        {props.title}
        <FiShoppingCart className="m-l-5" />
      </Link>
    </>
  );
}

//btn  in Pagination

export function BtnPageNumber(props) {
  return (
    <div className="btn__page">
      <Link
        to={"/product"}
        className={classNames("btn--pagenumber", "text-center")}
      >
        {props.title}
      </Link>
    </div>
  );
}
export function BtnPageActive(props) {
  return (
    <>
      <Link to={""} className="btn--pagenumberactive text-center ">
        {props.title}
      </Link>
    </>
  );
}
export function BtnRegister(props) {
  return (
    <>
      <Link to={""} className="btn-register text-center ">
        {props.title}
      </Link>
    </>
  );
}
//Button mua hang
export function BtnPurchase(props) {
  return (
    <>
      <Link to={""} className="btn-register text-center ">
        {props.title}
      </Link>
    </>
  );
}
