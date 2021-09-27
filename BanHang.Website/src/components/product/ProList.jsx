import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../../components/shared/card/ProductCard/ProductCard";

const ProList = (props) => {
  const products = props.products;
  return (
    <>
      <div className="gird_row">
        {products.map((product, index) => (
          <div className="gird_col" style={{ "--width-row": "3%" }}>
            <ProductCard
              key={index}
              productName={product.name}
              rate={product.averageRate}
              price={product.unitPrice}
              imgUrl={product?.pictures[0]?.filePath}
              productId={product.id}
            />
          </div>
        ))}
      </div>
      {/* 
      <div className="productCard position-relative">
      <div className="productCard__img">
        <Link to={`/product-detail/${productId}`}>
          <img src={process.env.PUBLIC_URL + imgUrl} alt="" />
        </Link>
      </div>
      <div className="productCard__info">
        <Link to={"/product-detail"}>
          <h5 className="product__name">{productName}</h5>
        </Link>
        <span className="product__price font-weight-bold">
          {price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
        <div className="product__rating d-flex justify-content-center ">
          <ReactStars
            classNames={"justify-content-center"}
            {...ratingConfig}
            value={rate}
          />
        </div>
      </div>
      <div className="productCard__action">
        <BtnAddCart title="Add to cart" productId={productId} Quantity={1} />
      </div>
    </div>
     */}
    </>
  );
};

export default ProList;
