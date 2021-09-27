import React from "react";
import ReactStars from "react-rating-stars-component";
import { BtnAddCart } from "../../button/AddtoCart";
import { Link } from "react-router-dom";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const ratingConfig = {
  size: 20,
  isHalf: true,
  emptyIcon: <FaRegStar />,
  halfIcon: <FaStarHalfAlt />,
  filledIcon: <FaStar />,
  edit: false,
};

function ProductCard({ productName, rate, price, imgUrl, productId }) {
  return (
    <div className="pro-card">
      <div className="pro-card-img">
        <Link
          className="pro-card-img__link"
          to={`/product-detail/${productId}`}
        >
          <img
            className="pro-card-img__img"
            src={process.env.PUBLIC_URL + imgUrl}
            alt=""
          />
        </Link>
      </div>
      <div className="pro-card-info">
        <Link to={"/product-detail"}>
          <h5 className="pro-card-info--name">{productName}</h5>
        </Link>
        <span className="pro-card-info--weight font-weight-bold">
          {price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
        <div className="pro-card-info__rating ">
          <ReactStars
            classNames={"justify-content-center"}
            {...ratingConfig}
            value={rate}
          />
        </div>
      </div>
      <div className="pro-card-action">
        <BtnAddCart
          className="pro-cart-action--btn"
          title="Add to cart"
          productId={productId}
          Quantity={1}
        />
      </div>
    </div>
  );
}

export default ProductCard;
