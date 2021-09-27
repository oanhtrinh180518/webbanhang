import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import CartItem from "../../components/shared/card/cartCard/CartItem";
import {
  BtnCheckOut,
  BtnClearCart,
  BtnShoppingGreen,
  BtnUpdateCart,
} from "../../components/shared/button/CardBtn";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllCart, getAllCartByUerId } from "../../app/cartSlice";
import { useState } from "react";
import Select from "react-select";
import { unwrapResult } from "@reduxjs/toolkit";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  const carts = useSelector((state) => state.cart.cartResult);
  const [dataTable, setDataTable] = useState(carts);
  const totals = dataTable.reduce(
    (currentTotal, cartB) => currentTotal + cartB.unitPrice * cartB.quantity,
    0
  );
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(0);
  useEffect(() => {
    const getTotal = () => {
      const res = dataTable.reduce((prev, item) => {
        return prev + item.unitPrice * item.quantity;
      }, 0);

      setTotal(res);
    };
    getTotal();
  }, [loading, dataTable]);

  const subtotal = [];
  const dispatch = useDispatch();
  const onClearCart = async () => {
    await dispatch(deleteAllCart());

    const itemCart = await dispatch(
      getAllCartByUerId({ PageIndex: 1, PageSize: 6 })
    );
    const actionCart = await unwrapResult(itemCart);
    setDataTable(actionCart.result.items);
  };

  const table = () => {
    return (
      <>
        {carts.map((cart, index) => (
          <CartItem
            key={index}
            id={cart.id}
            image={cart.pictures[0].filePath}
            productName={cart.productName}
            unitPrice={cart.unitPrice}
            qty={cart.quantity}
            productId={cart.productId}
            availableQuantity={cart.availableQuantity}
            setCart={(cart) => setDataTable(cart)}
            setLoading={(loadingIndex) => setLoading(loadingIndex)}
          />
        ))}
      </>
    );
  };
  // Cart mobile items
  const cartList = () => {};

  return carts.length > 0 ? (
    <div className="container">
      <div className=" cart text-center">
        <h3 className={"m-b-20 font-weight-bold"}>Your Cart Items</h3>

        <Table bordered hover>
          <thead>
            <tr className="list-cart">
              <th className="col-2 text-center">IMAGE</th>
              <th className="col-4 text-center">PRODUCT NAME</th>
              <th className="col-2 text-center">UNIT PRICE</th>
              <th className="col-2 text-center">QTY</th>
              <th className="col-1 text-center">SUBTOTAL</th>
              <th className="col-2 text-center">ACTION </th>
            </tr>
          </thead>
          <tbody>{table()}</tbody>
        </Table>

        <div className="cart__actions d-flex justify-content-between mb-4 mt-4">
          <div className="btn-left">
            <BtnShoppingGreen title="CONTINUE SHOPPING" className="d-block" />
          </div>
          <div className="cart__btn d-flex">
            <div className="btn-update mr-3">
              <BtnUpdateCart title="UPDATE SHOPPING CART" />
            </div>
            <div className="btn-clear">
              <BtnClearCart
                title="Clear Shopping Cart"
                onClick={() => onClearCart()}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 updateinfo d-flex justify-content-end mb-4 m-t-50">
        <div className="info-right col-xs-12 col-sm12 col-md-6 col-lg-4">
          <div className="info-title">
            <h5 className="font-weight-bold border-bottom p-3 text-uppercase">
              CART TOTAL
            </h5>
          </div>
          <div className="info-box">
            <div className="info-total d-flex justify-content-between border-bottom pb-2 ">
              <span className="  ">Total product Price: </span>
              <span className="font-weight-bold">
                {totals.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="info-ship d-flex justify-content-between border-bottom pb-2 pt-2">
              <span>Total shipping</span>
              <span className="font-weight-bold">Free ship</span>
            </div>
            <div className="info-grandtotal d-flex justify-content-between pb-3 pt-3">
              <h4>Grand Total:</h4>
              <h4 className="font-weight-bold">
                {totals.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </h4>
            </div>
            <div className="info-checkout d-flex justify-content-center ">
              <BtnCheckOut path={"/check-out"} title={"Check out"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <CartEmpty />
  );
};
export default Cart;
