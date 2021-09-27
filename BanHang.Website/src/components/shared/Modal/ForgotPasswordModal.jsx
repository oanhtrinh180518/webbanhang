import React from 'react';
import {Button, Col, Modal, Row, Spinner} from "react-bootstrap";
import * as Yup from "yup";
import {Formik, Form, FastField} from "formik";
import InputField from "../custom-fields/InputField/InputField";
import {useDispatch} from "react-redux";
import {forgotPassword} from "../../../app/userSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import {toast, Toaster} from "react-hot-toast";

function ForgotPasswordModal(props) {
  const dispatch = useDispatch()
  const initialValues = {
    Email: '',
  };
  const validationSchema = Yup.object().shape({
    Email: Yup.string().email('Email is invalid').required('Email is require.'),
  });
  const handleSubmit = async (values) => {
    const action = await dispatch(await forgotPassword(values))
    console.log("Action",action)
    const result = await unwrapResult(action)
    console.log(result)
    result && result.isOk === true &&
      console.log("aaa")
    toast.success("Một email đặt lại mật khẩu đã được gửi vào hộp thư của bạn. Vui lòng kiểm tra.")
    props.onHide()
  }
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          success:{
            duration: 5000
        }
        }}
      />
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          <h4>Forgot Password</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {
              formikProps => {
                const {isSubmitting} = formikProps;

                return (
                  <Form>
                    <Row>
                      <Col>
                        <label htmlFor="Email"><span className={'text-danger'}>* </span>Enter your email:</label>
                        <FastField
                          name={'Email'}
                          component={InputField}

                          type={'email'}
                          placeholder={'Your Email'}
                        />
                      </Col>
                    </Row>
                    <Button variant="primary btn-block" type="submit">
                      {isSubmitting &&
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      }
                      Submit
                    </Button>
                  </Form>
                )
              }
            }
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
ForgotPasswordModal.propTypes = {
  onSubmit: PropTypes.func,
}

ForgotPasswordModal.defaulProps = {
  onSubmit: null,
}

export default ForgotPasswordModal;
