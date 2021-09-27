import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import {
  FaRegStar,
  FaStarHalfAlt,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import Count from "../../../product/product-detail/Count";
import { Col } from "react-bootstrap";

import { BtnBuyItNow } from "../../button/CardBtn";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { BtnAddCart } from "../../button/AddtoCart";
const ProductCardBig = ({
  productName,
  describe,
  rate,
  price,
  imgUrl,
  netWeight,
  availableQuantity,
  productId,
}) => {
  const ratingConfig = {
    size: 20,
    isHalf: true,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
    edit: false,
    //  value:rate
  };
  const [count, setCount] = useState(1);
  return (
    <div className="product-details__card ">
      <Col xs={12} sm={12} md={5} lg={5}>
        <div className="product-details__card-img ">
          {/* <img src={"http://localhost:3005/" + imgUrl} alt="#" /> */}
          <img
            src={process.env.PUBLIC_URL + imgUrl}
            width="100%"
            height="100%"
            alt=""
          />
        </div>
      </Col>
      <Col xs={12} sm={12} md={7} lg={7}>
        <div className="product-details__card-content">
          <h3 className="product-details__card-name">{productName}</h3>
          <div className="product-details__card-rate">
            {rate > 0 && <ReactStars {...ratingConfig} value={rate} />}
          </div>
          <div className="product-details__card-price">
            <span className="font-weight-bold ">
              {/* {`${price} VND`} */}
              {price.toLocaleString("it-IT", {
                currency: "VND",
              })}
              &nbsp;VND
            </span>
          </div>
          <div className="product-details__card-des">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
              debitis deleniti eum facilis harum ipsam. Fugit incidunt officia
              reiciendis repellendus!
            </p>
            {/*<span className="p-content__description--span">{describe}</span>*/}
          </div>
          <div className="product-details__card-inStock">
            <span className="font-weight-bold ">
              {`Net Weight: ${netWeight} KG`}
            </span>
          </div>
          <div className="product-details__card-inStock">
            <span className="font-weight-bold ">
              <FaCheckCircle />
              {` ${availableQuantity} in stock`}
            </span>
          </div>
          <div className="product-details__card-qty d-flex mt-4">
            <span className="font-weight-bold mr-4">Quantity:</span>
            <Count
              count={count}
              maxCount={availableQuantity}
              setCount={(count) => setCount(count)}
            />
          </div>
          <div className="p-content__btn mt-4">
            <BtnAddCart
              productId={productId}
              title="Add to card"
              Quantity={count}
            />
            <BtnBuyItNow title="Buy it now" />
          </div>
        </div>
      </Col>
    </div>
  );
};

export default ProductCardBig;
