import React, {useState} from "react";
import { FaBan } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import {UserViewOrderDetailsModal} from "../shared/Modal/ConfirmModal";
import {Badge} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {userCancelOrder} from "../../app/orderSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const OrderList = ({ no, orderId, date, status, totalPrice, order, shipDate, username, loadIndex, reload }) => {
  const dispatch = useDispatch()

  function convert(str) {
    let date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  const handlePrice = (price) => {
     return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
  }

  const handleCancelOrder = async (orderId) => {
    const actionResult = await dispatch(userCancelOrder({orderId}));
    const cancelResult = await unwrapResult(actionResult);
    console.log("cancelResult",cancelResult)
    if (cancelResult.isOk === true) {
        toast.success(cancelResult.message)
    } else {
      toast.error(cancelResult.message)
    }
    reload(loadIndex + 1)
  }
  const [modalShow, setModalShow] = useState(false);
  const getStatus = (status) => {
    switch (status) {
      case 0:
        return <Badge variant={'danger'}>Canceled</Badge>
      case 1:
        return <Badge variant={'secondary'}>Pending</Badge>
      case 2:
        return <Badge variant={'warning'}>Processing</Badge>
      case 3:
        return <Badge variant={'info'}>On Delivery</Badge>
      case 4:
        return <Badge variant={'success'}>Completed</Badge>
      default:
        return <Badge variant={'dark'}>Error</Badge>
    }
  }

//   const orders = [
//     { no: "1", name: "TIEN", date: "2021-05-06", status: "PENDING", tatol: "100000", action: "VIEW" },
//     { no: "2", name: "TIEN1", date: "2021-05-06", status: "ON HOLD", tatol: "200000", action: "VIEW" }
// ];

  return (
    <tr >
      <td className="col-1 text-center">{no}</td>
      <td className="col-1 text-center">{orderId}</td>
      <td className="col-2 text-center align-middle">{convert(date)}</td>
      <td className="col-2 text-right align-middle">{handlePrice(totalPrice)}</td>
      <td className="col-1 text-center align-middle">{getStatus(status)}</td>
      <td className="col-1 text-center align-middle"><Link onClick={()=>setModalShow(true)}><FcSearch/></Link>
        {order &&
          <UserViewOrderDetailsModal
            modalTitle={'Order details'}
            modalAction={'detail'}
            orderInfor={{...order, shipDate:shipDate, createDate:date, userName:username}}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        }
      </td>
      <td className="col-1 text-center">
        {
          status === 1 ? <button onClick={()=>handleCancelOrder(orderId)} className="cancel-order-btn"><MdCancel/></button>
            : <button disabled={true} className="cancel-order-btn--ban"><FaBan/></button>
        }
      </td>
    </tr>
        
  );
};

export default OrderList;
