import React, {useEffect, useState} from 'react';
import {Row, Col, Spinner, Button} from 'react-bootstrap'
import { Formik, Form, FastField } from 'formik';
import {useLocation}  from 'react-router-dom'
import queryString from 'query-string'
import * as Yup from "yup";
import InputField from "../../components/shared/custom-fields/InputField/InputField";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {clearState, resetPassword, userSelector} from "../../app/userSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {toast, Toaster} from "react-hot-toast";
import ResetPasswordModal from "../../components/shared/Modal/ResetPasswordModal";



function ResetPassword(props) {
  const { isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false);
  const initialValues = {
    NewPassword: '',
    ConfirmNewPassword: '',
  }
  const validationSchema = Yup.object().shape({
    NewPassword: Yup.string().required('Password is require.'),
    ConfirmNewPassword: Yup.string().required('Confirm password is require.'),
  });
  const {search} = useLocation();
  const handleSubmit = async (values) => {
    console.log("values", values)
    const params = queryString.parse(search)
    const submitValues = {...values, Token:params.token, Email:params.email}
    console.log("submitValues", submitValues)
    const actionResult = await dispatch(await resetPassword(submitValues))
    console.log(actionResult)
    const resetResult = await unwrapResult(actionResult)
    console.log("Reset result",resetResult)
    resetResult && resetResult.isOk === true &&
      setModalShow(true)
  }
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
    }
    if (isError) {
      // toast.error(errorMessage);
      console.log("Error", errorMessage)
      errorMessage && toast.error(errorMessage)
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, [isSuccess, isError])


  return (
    <>
      <Toaster/>
      <Row className="w-100">
        <Col lg={6} md={6} sm={12} className="m-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {
              formikProps => {
                const {isSubmitting} = formikProps
                return (
                  <Form className="d-flex align-items-center flex-column">
                    <h4 className={'m-b-20'}>Reset password</h4>
                    <Col sm={8}>
                      <label style={{fontSize: '14px' }} htmlFor="NewPassword"><span className={'text-danger'}>* </span>New password:</label>
                      <FastField
                        name={'NewPassword'}
                        component={InputField}

                        type={'password'}
                        placeholder={'New Password'}
                      />
                    </Col>
                    <Col sm={8}>
                      <label style={{fontSize: '14px' }} htmlFor="ConfirmNewPassword"><span className={'text-danger'}>* </span>Confirm New password:</label>
                      <FastField
                        name={'ConfirmNewPassword'}
                        component={InputField}

                        type={'password'}
                        placeholder={'Confirm New Password'}
                      />
                    </Col>
                    <Col sm={8}>
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
                        Reset password
                      </Button>
                    </Col>
                  </Form>
                )
              }
            }
          </Formik>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <div className="reset-password__form-right">
          </div>
        </Col>
      </Row>
      <ResetPasswordModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
ResetPassword.propTypes = {
  onSubmit: PropTypes.func,
}

ResetPassword.defaulProps = {
  onSubmit: null,
}

export default ResetPassword;