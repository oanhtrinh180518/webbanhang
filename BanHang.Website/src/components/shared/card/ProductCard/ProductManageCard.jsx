import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../../../app/productSlice";

import { ImRadioChecked, ImRadioUnchecked } from "react-icons/im";
import ProductRow from "../../card/ProductCard/ProductRow";
const ProductManageCard = ({ products }) => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);

  return (
    <div className="admin__table">
      <Table bordered hover>
        <thead>
          <tr className="list-cart">
            <th className="col-1 text-center text-uppercase align-middle">
              ID
            </th>
            <th className="col-2 text-center align-middle ">PRODUCT NAME</th>
            <th className="col-2 text-center text-uppercase align-middle">
              Category Name
            </th>
            <th className="col-2 text-center text-uppercase align-middle">
              Supplier Name
            </th>
            <th className="col-2 text-center text-uppercase align-middle">
              UNTIL PRICE
            </th>
            <th className="col-1 text-center text-uppercase align-middle">
              Available Quantity
            </th>
            <th className="col-2 text-center text-uppercase align-middle">
              createDate
            </th>
            <th className="col-2 text-center text-uppercase align-middle">
              updateDate
            </th>
            <th className="col-3 text-center text-uppercase align-middle">
              Active
            </th>
            <th className="col-3 text-center text-uppercase align-middle">
              Update
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductRow
            key={index}
            product={product}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductManageCard;
