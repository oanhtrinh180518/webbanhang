import React, { useEffect, useState } from "react";
import { Formik, Form, FastField } from "formik";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import InputField from "../../components/shared/custom-fields/InputField/InputField";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { clearState, userRegister, userSelector } from "../../app/userSlice";
import { toast, Toaster } from "react-hot-toast";

export default function Register() {
  const history = useHistory();
  const { loading, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const initialValues = {
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
  // Validate input
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is require,"),
    username: Yup.string().required("This field is require."),
    email: Yup.string().email("Email is invalid").required("Email is require."),
    password: Yup.string().required("Password is require."),
    // phoneNumber: Yup.string().required('Phone number is require.'),
    confirmPassword: Yup.string().required("Confirm password is require."),
  });
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const actionResult = await dispatch(userRegister(values));
    console.log("ActionResult", actionResult);
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }

    if (isError) {
      // toast.error(errorMessage);
      console.log("Error", errorMessage);
      errorMessage
        ? toast.error(errorMessage)
        : toast.error("Xác nhận mật khẩu không chính xác");
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Toaster />
      <Col lg={6} md={6} sm={12} xs={12} className="m-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            // do somethings
            const { values, errors, touched, isSubmitting } = formikProps;
            // console.log({values, errors, touched})

            return (
              <Form className="register">
                <h5 className={"m-b-20"}>Register</h5>
                <Row>
                  <Col sm={6}>
                    <label htmlFor="fullName">
                      <span className={"text-danger"}>* </span>Full name:
                    </label>
                    <FastField
                      name={"fullName"}
                      component={InputField}
                      type={"text"}
                      placeholder={"Full name"}
                    />
                  </Col>
                  <Col sm={6}>
                    <label htmlFor="username">
                      <span className={"text-danger"}>* </span>Username:
                    </label>
                    <FastField
                      name={"username"}
                      component={InputField}
                      type={"text"}
                      placeholder={"Username"}
                    />
                  </Col>
                </Row>
                <label htmlFor="email">
                  <span className={"text-danger"}>* </span>Email:
                </label>
                <FastField
                  name={"email"}
                  component={InputField}
                  type={"email"}
                  placeholder={"Email"}
                />
                <label htmlFor="phoneNumber">Phone Number:</label>
                <FastField
                  name={"phoneNumber"}
                  component={InputField}
                  type={"text"}
                  placeholder={"Phone number"}
                />
                <label htmlFor="password">
                  <span className={"text-danger"}>* </span>Password:
                </label>
                <FastField
                  name={"password"}
                  component={InputField}
                  type={"password"}
                  placeholder={"Password"}
                />
                <label htmlFor="confirmPassword">
                  <span className={"text-danger"}>* </span>Confirm password:
                </label>
                <FastField
                  name={"confirmPassword"}
                  component={InputField}
                  type={"password"}
                  placeholder={"ConfirmPassword"}
                />

                <Button variant="primary btn-block" type="submit">
                  {isSubmitting && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  Create Account
                </Button>

                <div className="text-left mt-3">
                  {/*<Link to={'/register'} ><small className="reset">Password Reset</small></Link> II*/}
                  <Link to={"/login"}>
                    <small className="reset float-right">Login</small>
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Col>

      <Col lg={6} md={6} sm={12}>
        <div className="register__form-right"></div>
      </Col>
    </>
  );
}
Register.propTypes = {
  onSubmit: PropTypes.func,
};

Register.defaulProps = {
  onSubmit: null,
};
