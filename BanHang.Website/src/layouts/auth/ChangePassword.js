import React, {useEffect} from 'react';
import { Formik, Form, FastField } from 'formik';
import InputField from "../../components/shared/custom-fields/InputField/InputField";
import * as Yup from "yup";
import {Button, Col, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changePassword, clearState, userSelector} from "../../app/userSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";
import {useCookies} from "react-cookie";
import { useHistory } from "react-router-dom";




function ChangePassword(props) {
  const [cookies, setCookies, removeCookie] = useCookies();
  const history = useHistory();
  const { loading, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const dispatch = useDispatch()
  const initialValues = {
    CurrentPassword: '',
    NewPassword: '',
    ConfirmNewPassword: '',
  }
  const validationSchema = Yup.object().shape({
    CurrentPassword: Yup.string().required('Current Password is require.'),
    NewPassword: Yup.string().required('Password is require.'),
    ConfirmNewPassword: Yup.string().required('Confirm password is require.'),
  });
  const logOut = () => {
    removeCookie("access_token");
    history.push({
      pathname: '/login',
      state: {
        message: 'Password has been changed, please login again!'
      }
    })
  }
  const handleSubmit = async (values) => {
    console.log(values);
    const actionResult = await dispatch(await changePassword(values))
    console.log(actionResult)
    const changeResult = await unwrapResult(actionResult)
    console.log(changeResult)
    changeResult && changeResult.isOk === true &&
      await logOut()
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
      <div className="change-password">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {
            formikProps => {
              const {isSubmitting} = formikProps
              return (
                <Form className="d-flex flex-column">
                  <Col sm={8}>
                    <label style={{fontSize: '14px' }} htmlFor="CurrentPassword"><span className={'text-danger'}>* </span>Current password:</label>
                    <FastField
                      name={'CurrentPassword'}
                      component={InputField}

                      type={'password'}
                      placeholder={'Current Password'}
                    />
                  </Col>
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
                      Change password
                    </Button>
                  </Col>
                </Form>
              )
            }
          }
        </Formik>
      </div>
    </>
  );
}

export default ChangePassword;