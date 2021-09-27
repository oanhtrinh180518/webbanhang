import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const ProductCardSmall = ({
  productName,
  describe,
  rate,
  price,
  imgUrl,
  productId,
}) => {
  const ratingConfig = {
    size: 15,
    isHalf: true,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
    edit: false,
  };
  return (
    <>
      <div className="productCard--small d-flex justify-content-center m-b-10 px-2 p-t-10">
        <div className="productCard__img">
          <Link to={`/product-detail/${productId}`}>
            <img src={process.env.PUBLIC_URL + imgUrl} alt="#" />
          </Link>
        </div>
        <div className="card__info mr-2">
          <Link to={`/product-detail/${productId}`}>
            <h6 className="card__info-title text-center font-weight-bold">
              {productName}
            </h6>
          </Link>
          <div className="card__info-rating d-flex justify-content-center m-b-10">
            <ReactStars
              // classNames={"justify-content-center"}
              {...ratingConfig}
              value={rate}
            />
            </div>
            <span className="product__price font-weight-bold text-center d-flex justify-content-center">
              {price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          
        </div>
      </div>
    </>
  );
};

export default ProductCardSmall;
