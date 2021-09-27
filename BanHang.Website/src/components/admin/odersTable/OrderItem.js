import React, {useState} from 'react';
import {Badge} from "react-bootstrap";
import ViewIcon from '../../../assets/img/icon/flatIcon/magnifying-glass_24.png'
import EditIcon from '../../../assets/img/icon/flatIcon/edit_24.png'
import {Link} from 'react-router-dom'
import {UpdateOrderModal} from "../../shared/Modal/ConfirmModal";
import {useDispatch} from "react-redux";
import {getUserById} from "../../../app/userSlice";
import {unwrapResult} from "@reduxjs/toolkit";

function OrderItem ({
  username,
  index,
  id,
  userId,
  createAt,
  shipDate,
  address,
  phoneNumber,
  totalPrice,
  status,
  orderDetails,
  reload,
  loadIndex,
  pageIndex,
  pageSize
  })
{
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('')

  const handleGetUsername = () => {
    getUserInfo();
  }

  const getUserInfo = async () => {
    const actionResult = await dispatch(getUserById(userId));
    const payload = await unwrapResult(actionResult);
    const fullName = payload.fullName;
    setFullName(fullName)
  }

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
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

  return (
    <>
      <tr>
        <td>{index + (pageIndex - 1) * pageSize + 1}</td>
        <td>{username}</td>
        <td>{createAt}</td>
        <td>{shipDate}</td>
        <td>{phoneNumber}</td>
        <td>{address}</td>
        <td>{totalPrice}</td>
        <td>
          {
            getStatus(status)
          }
        </td>
        <td className={'tb__actions'}>
          {
            (status !== 0 && status !== 4) ? <Link className={'tb__actions-edit'} onClick={() => {
              setModalShow(true)
              setModalTitle("Cập nhật đơn hàng")
              setModalAction("update")

            }} >
              {/*<FaRegEdit/>*/}
              <img src={EditIcon} alt=""/>
            </Link> : <></>
          }
          <Link className={'tb__actions-view'}
            onClick={() => {
            setModalShow(true)
            setModalTitle("Chi tiết đơn hàng")
            setModalAction("detail")
            handleGetUsername()
          }}
          >
            <img src={ViewIcon} alt=""/>
            {/*<FcSearch/>*/}
          </Link>
        </td>
      </tr>
      <UpdateOrderModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalTitle={modalTitle}
        orderInfor={{username,id, userId, createAt, shipDate, address, phoneNumber, totalPrice, status, orderDetails }}
        modalAction={modalAction}
        fullName={fullName}
        loadIndex={loadIndex}
        reload={(loadIndex) => reload(loadIndex)}
      />
    </>
  );
}

export default OrderItem;