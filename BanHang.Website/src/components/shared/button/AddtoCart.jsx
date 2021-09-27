import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { addToCart, getAllCartByUerId } from "../../../app/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export function BtnAddCart(props) {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [cookie] = useCookies();
  const dispatch = useDispatch();
  // const [notification, setNotification] = useState("");
  const [totalCart, setTotalCart] = useState();
  // const
  const onClickCart = async () => {
    if (!cookie["access_token"]) {
      toast.error("Bạn chưa đăng nhập");
    } else {
      const acctionAddCart = await dispatch(
        addToCart({ ProductId: props.productId, Quantity: props.Quantity })
      );
      const itemAddCart = await unwrapResult(acctionAddCart);
     
      if (!itemAddCart.isOk) toast.error(itemAddCart.message);
      else {
        toast.success(itemAddCart.message);
        const acctionListCart = await dispatch(
          getAllCartByUerId({ PageIndex: 1, PageSize: 9 })
        );
        const itemListCart = await unwrapResult(acctionListCart);
        setTotalCart(itemListCart.result.totalRecords);
      }

    }
  };
  return (
    <div className="addtocart m-b-20">
      <Toaster style={{"z-index":"10000"}} />
      <button
        type="button"
        className="btn-add-cart d-block"
        onClick={() => onClickCart()}
      >
        {props.title}
        <FiShoppingCart className="m-l-5" />
      </button>
    </div>
  );
}
