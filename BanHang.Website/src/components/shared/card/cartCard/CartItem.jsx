import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  deleteACart,
  getAllCartByUerId,
  updateCart,
} from "../../../../app/cartSlice";
import Count from "../../../product/product-detail/Count";
import { Link } from "react-router-dom";

const CartCard = ({
  id,
  image,
  productName,
  unitPrice,
  qty,
  isDelete,
  setCart,
  productId,
  loadingIndex,
  setLoading,
  availableQuantity,
  setSubtotal,
  total,
  setTotal,
}) => {
  const [quantity, setQuantity] = useState(qty);
  const changeQuantity = (value) => {
    const onLoad = async (value) => {
      if (value < 1) setQuantity(1);
      else if (value > availableQuantity) setQuantity(availableQuantity);
      else setQuantity(value);
      // await setQuantity(value);
      await dispatch(updateCart({ ProductId: productId, Quantity: value }));

      const acctionCart = await dispatch(
        getAllCartByUerId({ PageIndex: 1, PageSize: 9 })
      );
      const itemCart = await unwrapResult(acctionCart).result;
      setCart(itemCart.items);
      console.log("value", value);
    };

    onLoad(value);
  };
  const subTotal = unitPrice * quantity;
  // setSubtotal(unitPrice * quantity);
  const dispatch = useDispatch();

  const onClickDelete = () => {
    const onLoad = async () => {
      await dispatch(deleteACart({ productId: productId }));

      const acctionCart = await dispatch(
        getAllCartByUerId({ PageIndex: 1, PageSize: 9 })
      );
      const itemCart = await unwrapResult(acctionCart).result;
      setCart(itemCart.items);
    };
    onLoad();
  };

  useEffect(() => {
    const loadTotal = async () => {
      await dispatch(updateCart({ ProductId: productId, Quantity: quantity }));

      setLoading(loadingIndex + 1);

      const acctionCart = await dispatch(
        getAllCartByUerId({ PageIndex: 1, PageSize: 9 })
      );
      const itemCart = await unwrapResult(acctionCart).result;
      setCart(itemCart.items);
    };
    loadTotal();
  }, [quantity]);
  return (
    <tr>
      <td className="col-2 text-center">
        <Link to={`/product-detail/${productId}`}>
          <img
            className=""
            width="100px"
            src={process.env.PUBLIC_URL + image}
            alt="#"
          />
        </Link>
      </td>
      <td className="col-4 text-center align-middle">{productName}</td>
      <td className="col-2 text-center align-middle">
        {unitPrice.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </td>
      <td className="col-2 text-center align-middle">
        <button
          className="font-weight-bold"
          onClick={() => changeQuantity(quantity - 1)}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => changeQuantity(e.target.value)}
          min={1}
          // defaultValue={1}
          className="count text-center border-bottom w-50"
        />
        <button
          className="font-weight-bold"
          onClick={() => changeQuantity(quantity + 1)}
        >
          +
        </button>
      </td>
      <td className="col-2 text-center align-middle">
        {subTotal.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </td>{" "}
      <td className="col-1 text-center align-middle">
        <div className="cart__delete">
          <FaTimes onClick={() => onClickDelete()} />
        </div>
      </td>
    </tr>
  );
};

export default CartCard;
