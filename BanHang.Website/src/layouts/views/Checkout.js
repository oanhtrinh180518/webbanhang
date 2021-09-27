import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Row} from 'react-bootstrap'
import { Formik, Form, FastField } from 'formik';
import InputField from "../../components/shared/custom-fields/InputField/InputField";
import * as Yup from "yup";
import {userSelector} from "../../app/userSlice";
import {cartSelector, clearCart, getAllCartByUerId} from "../../app/cartSlice";
import {makeOrder} from "../../app/orderSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";



const Checkout = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(
    userSelector
  );
  const carts = useSelector(cartSelector).cartResult
  const [initialValues, setInitialValues] = useState({
    FullName: "",
    Email:"",
    PhoneNumber: "",
    Address: "",
  })
  const validationSchema = Yup.object().shape({
    FullName: Yup.string().required('Full name is require.'),
    Email: Yup.string().email('Email is invalid').required('Email is require.'),
    PhoneNumber: Yup.string().required('This field is require.'),
    Address: Yup.string().required('This field is require.'),
  });
  function onLoad() {
    const {fullName, email, phoneNumber, address} = userInfo
    setInitialValues({
      FullName: fullName,
      Email: email,
      PhoneNumber: phoneNumber,
      Address: address
    })
  }
  useEffect(() => {
    userInfo && onLoad()
    // eslint-disable-next-line
  }, [userInfo])

 const totalPrice =  carts.reduce((acc, curr) => {
   return acc += curr.unitPrice * curr.quantity
  }, 0)

  const handleSubmit =async (values) => {
    console.log("Values:", values);
    const productInSubmit = carts.map(obj => {
      let newObj = {
        productId: obj.productId,
        quantity: obj.quantity
      }
      return newObj;
    })
    const submitValues = {
      Address: values.Address,
      Phone: values.PhoneNumber,
      Products: productInSubmit
    }
    const actionResult = await dispatch(makeOrder(submitValues));
    const actionResponse = await unwrapResult(actionResult);
    await dispatch(clearCart)
    if(actionResponse.isOk === true) {
      history.push("/check-out-success")
    } else {
      toast.error(actionResponse.message)
    }
	await dispatch(getAllCartByUerId({ PageIndex: 1, PageSize: 9 }));																 
  }
  return (
    <Container>
      <Toaster />
      { !userInfo ? history.push('/401-unauthorized-page') :
        <div className="checkOut m-b-100">
          <Row>
            <Col sm={7}>
              <div className="checkOut__left">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  enableReinitialize={true}
                  onSubmit={handleSubmit}
                >
                  {
                    formikProps => {
                      return (
                        <Form className="">
                          <h3>Thông tin đơn hàng</h3>
                          <p>(<span className={'text-danger'}>*</span> bắt buộc nhập)</p>
                          <Row>
                            <Col sm={6}>
                              <label htmlFor="FullName"><span className={'text-danger'}>* </span>Full name:</label>
                              <FastField
                                name={'FullName'}
                                component={InputField}
                                {...formikProps.getFieldProps('FullName')}

                                type={'text'}
                                disabled={true}
                                placeholder={'Full Name'}
                              />
                            </Col>
                            <Col sm={6}>
                              <label htmlFor="Email">Email:</label>
                              <FastField
                                name={'Email'}
                                component={InputField}
                                {...formikProps.getFieldProps('Email')}

                                type={'text'}
                                disabled={true}
                                placeholder={'Email'}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={6}>
                              <label htmlFor="PhoneNumber"><span className={'text-danger'}>* </span>Phone number:</label>
                              <FastField
                                name={'PhoneNumber'}
                                component={InputField}
                                {...formikProps.getFieldProps('PhoneNumber')}

                                type={'text'}
                                placeholder={'Phone number'}
                              />
                            </Col>
                            <Col sm={6}>
                              <label htmlFor="Note">Ghi chú:</label>
                              <FastField
                                name={'Note'}
                                component={InputField}
                                {...formikProps.getFieldProps('Note')}

                                type={'text'}
                                placeholder={'Note'}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={12}>
                              <label htmlFor="Address"><span className={'text-danger'}>* </span>Delivery address:</label>
                              <FastField
                                name={'Address'}
                                component={InputField}
                                {...formikProps.getFieldProps('Address')}

                                type={'text'}
                                placeholder={'Address'}
                              />
                            </Col>
                          </Row>
                          { userInfo ?
                            <Button
                              variant={'primary'}
                              className={'tab__content-btn'}
                              type="submit">Place order
                            </Button>
                            :
                            <Button
                              disabled
                              variant={'primary'}
                              className={'tab__content-btn'}
                              type="submit">Place order
                            </Button>
                          }
                        </Form>
                      )
                    }
                  }
                </Formik>
              </div>
            </Col>
            <Col sm={5}>
              <div className="checkOut__right">
                <div className="checkOut__right-header m-b-50">
                  <h3>Danh sách sản phẩm</h3>
                </div>
                <div className="order__detail-right-top">
                  <h6>Product</h6>
                  <h6>Price</h6>
                </div>
                <ul className="order__detail-right-middle">
                  {
                    carts.map(cartItem => (
                      <li key={cartItem.id} className="d-flex justify-content-between">
                        <span>{`${cartItem.productName} x ${cartItem.quantity}`}</span>
                        <span>{`${cartItem.unitPrice * cartItem.quantity} vnd`}</span>
                      </li>
                    ))
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
                  <h5>{totalPrice} vnd</h5>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      }
    </Container>
  );
};

export default Checkout;
