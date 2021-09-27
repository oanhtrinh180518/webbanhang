import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllProductRate } from "../../../app/productSlice";
import ProductCardSmall from "../../shared/card/ProductCard/ProductCardSmall";

const ProductRate = () => {
  // const productsRate = useSelector((state) => state.product.productResult);

  const [productsRate, setProductRate] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      await onLoadData();
    };
    loadData();
    // eslint-disable-next-line
  }, []);
  const onLoadData = async () => {
    const acctionProductRate = await dispatch(
      getAllProductRate({
        PageIndex: 1,
        PageSize: 3,
        IsRate: true,
      })
    );
    const itemProductRate = await unwrapResult(acctionProductRate);
    console.log("itemProductRate", itemProductRate.result.items);
    setProductRate(itemProductRate.result.items);
  };
  return (
    <div className="product-rate m-t-20">
      <div className="product-rate__header">
        <h5 className="font-weight-bold text-uppercase">top rate products</h5>
      </div>

      <Row lg={1} md={1} xs={1}>
        <Col>
          {productsRate.map((product, index) => (
            <ProductCardSmall
              key={index}
              productName={product.name}
              rate={product.averageRate}
              price={product.unitPrice}
              imgUrl={product?.pictures[0]?.filePath}
              productId={product.id}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default ProductRate;
