import React from 'react';
import { Formik, Form, FastField } from 'formik';
import {Button, Modal, Col, Badge} from "react-bootstrap";
import {adminUpdateActive} from "../../../app/userSlice";
import {useDispatch} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import InputField from "../custom-fields/InputField/InputField";
import { InputSelectStatus} from "../custom-fields/InputSelect/InputSelect";
import {adminUpdateOrder} from "../../../app/orderSlice";
import {toast, Toaster} from "react-hot-toast";

export function ConfirmModal(props) {
  console.log(props.isActive)
  const dispatch = useDispatch();
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const updateActive = async () => {
    let reqObj = {
      isActive: !props.isActive,
      memberId: props.userId
    }
    const actionResult = await dispatch(adminUpdateActive(reqObj));
    const result = await unwrapResult(actionResult);
    console.log("Result",result);
    props.reload(props.loadIndex + 1)

  }
  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          <h4>Thông báo</h4>
          <p>
            {props.modalText}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Hủy</Button>
          <Button variant="success" onClick={() => {
            props.onHide()
            updateActive()

          }}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// Update order modal
export function UpdateOrderModal(props) {
  const dispatch = useDispatch();
  // const [values, setValues] =useState({})
  console.log(props.orderInfor)

  const orderDetailInfo = props.orderInfor.orderDetails
  console.log(orderDetailInfo)
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
  const initialValues = {
    Id: props.orderInfor.id,
    // UserId: props.orderInfor.userId,
    ShipDate:props.orderInfor.shipDate,
    Status: props.orderInfor.status
  }

  const getModalAction = () => {
    // console.log(props.orderInfor.shipDate)
    const handleSubmit = async (values) => {
      console.log("Values",values)
      const newValues = {
        ...values,
        Status: parseInt(values.Status)
      }
      console.log("NewValues",newValues)
      const actionResult = await dispatch(adminUpdateOrder(newValues))
      const updateResult = await unwrapResult(actionResult)
      if (updateResult.isOk === true) {
        toast.success(updateResult.message)
      } else
        toast.error(updateResult.message)
      props.reload(props.loadIndex + 1)
    }
    // console.log("Values",values)


    switch (props.modalAction) {
      case 'update':
        return (
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {
                formikProps => {
                  return (
                    <Form className="order__update">
                      <Col className="order__update-header d-flex ">
                        <h5  className={'m-r-20'}>Mã đơn hàng: {props.orderInfor.id}</h5>
                        <h5>Khách hàng: {props.orderInfor.username}</h5>
                      </Col>
                      <div className="order__update-form d-flex">
                        <Col sm={5}>
                          <label htmlFor="ShipDate">Ship date</label>
                          <FastField
                            name={'ShipDate'}
                            component={InputField}
                            {...formikProps.getFieldProps('ShipDate')}


                            type={'date'}
                          />
                        </Col>
                        <Col sm={5}>
                          <label htmlFor="Status">Status</label>
                          <FastField
                            name={'Status'}
                            component={InputSelectStatus}
                            {...formikProps.getFieldProps('Status')}

                            type={'number'}
                          />
                        </Col>
                      </div>
                      <Col sm={2}>
                        <Button type='submit' variant="success">Save</Button>
                      </Col>
                    </Form>
                  )
                }
              }
            </Formik>

          </Modal.Body>
        )
      case 'detail':
        return (
          <Modal.Body>
            <Col sm={12}>
              <div className="order__detail d-flex justify-content-between">
                <Col sm={6}>
                  <ul className="order__detail-left">
                    <li>Mã đơn hàng: {props.orderInfor.id}</li>
                    <li>Ngày tạo: {props.orderInfor.createAt}</li>
                    <li>Ngày ship: {props.orderInfor.shipDate}</li>
                    <li>Tên khách hàng: {props.orderInfor.username}</li>
                    <li>Địa chỉ giao hàng: {props.orderInfor.address}</li>
                    <li>Số điện thoại người nhận: {props.orderInfor.phoneNumber}</li>
                    <li>Trạng thái: {getStatus(props.orderInfor.status)}</li>
                  </ul>
                </Col>
                <Col sm={6}>
                  <div className="order__detail-right">
                    <div className="order__detail-right-top">
                      <h6>Product</h6>
                      <h6>Price</h6>
                    </div>
                    <ul className="order__detail-right-middle">
                      {
                        orderDetailInfo.map(item => {
                          const orderDetailPrice = item.product.unitPrice * item.quantity;
                          return (
                            <li className="d-flex justify-content-between">
                              <span>{`${item.product.name} x ${item.quantity}`}</span>
                              <span>{orderDetailPrice} vnd</span>
                            </li>
                          )
                        })
                      }
                    </ul>
                    <ul className="order__detail-right-bottom">
                      <li className="d-flex justify-content-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span>Discount</span>
                        <span>None</span>
                      </li>
                    </ul>
                    <div className="order__detail-right-totalPrice">
                      <h5>Total</h5>
                      <h5>{props.orderInfor.totalPrice} vnd</h5>
                    </div>
                  </div>
                </Col>
              </div>
            </Col>
          </Modal.Body>
        )
      default:
        return <></>
    }
  }

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Toaster />
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        {
          getModalAction(props.modalAction)
        }
        <Modal.Footer>

          {
            props.modalAction === 'update' ?
              <Button variant="secondary" onClick={() => {
                props.onHide()
              }}>Đóng</Button>
              :
              <></>
          }
          {/*{*/}
          {/*  props.modalAction === 'update' ?*/}
          {/*    <Button type='submit' variant="success" onClick={() => {*/}
          {/*      props.onHide()*/}
          {/*    }}>*/}
          {/*      Xác nhận*/}
          {/*    </Button>*/}
          {/*    : <></>*/}
          {/*}*/}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function UserViewOrderDetailsModal(props) {
  // const [values, setValues] =useState({})
  console.log(props.orderInfor)

  const orderDetailInfo = props.orderInfor.orderDetails
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Toaster />
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col sm={12}>
          <div className="order__detail d-flex justify-content-between">
            <Col sm={6}>
              <ul className="order__detail-left">
                <li>Mã đơn hàng: {props.orderInfor.id}</li>
                <li>Ngày tạo: {props.orderInfor.createdAt ? props.orderInfor.createAt : props.orderInfor.createDate}</li>
                <li>Ngày ship: {props.orderInfor.shipDate}</li>
                <li>Tên khách hàng: {props.orderInfor.userName}</li>
                <li>Địa chỉ giao hàng: {props.orderInfor.address}</li>
                <li>Số điện thoại người nhận: {props.orderInfor.phone}</li>
                <li>Trạng thái: {getStatus(props.orderInfor.status)}</li>
              </ul>
            </Col>
            <Col sm={6}>
              <div className="order__detail-right">
                <div className="order__detail-right-top">
                  <h6>Product</h6>
                  <h6>Price</h6>
                </div>
                <ul className="order__detail-right-middle">
                  {
                    orderDetailInfo.map(item => {
                      const orderDetailPrice = item.product.unitPrice * item.quantity;
                      return (
                        <li className="d-flex justify-content-between">
                          <span>{`${item.product.name} x ${item.quantity}`}</span>
                          <span>{orderDetailPrice} vnd</span>
                        </li>
                      )
                    })
                  }
                </ul>
                <ul className="order__detail-right-bottom">
                  <li className="d-flex justify-content-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Discount</span>
                    <span>None</span>
                  </li>
                </ul>
                <div className="order__detail-right-totalPrice">
                  <h5>Total</h5>
                  <h5>{props.orderInfor.totalPrice} vnd</h5>
                </div>
              </div>
            </Col>
          </div>
        </Col>
      </Modal.Body>
      <Modal.Footer>

        {
          props.modalAction === 'update' ?
            <Button variant="secondary" onClick={() => {
              props.onHide()
            }}>Đóng</Button>
            :
            <></>
        }
      </Modal.Footer>
    </Modal>
  )
}