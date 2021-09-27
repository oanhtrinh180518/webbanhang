import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, FastField } from "formik";
import { Col, Button, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import InputField from "../../components/shared/custom-fields/InputField/InputField";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  userSelector,
  clearState,
  getUserByToken,
} from "../../app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";
import { ConfirmModal } from "../../components/shared/Modal/ConfirmModal";
import ForgotPasswordModal from "../../components/shared/Modal/ForgotPasswordModal";

export default function Login(props) {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const { loading, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is require."),
    password: Yup.string().required("Password is require."),
  });

  const getUserData = () => {
    const userData = dispatch(getUserByToken());
    console.log(userData);
  };
  const handleSubmit = async (values) => {
    const action = await login(values);
    const actionResult = await dispatch(action);
    const loginResult = unwrapResult(actionResult);

    if (loginResult.isOk) {
      const token = loginResult.result.token;
      setCookie("access_token", token, {
        path: "/",
        expires: new Date(Date.now() + 2692000000),
      });
      // history.push('/');
      await getUserData();
    }
  };

  // thong bao khi doi mat khau thanh cong
  useEffect(() => {
    const message = props.location.state?.message;
    message && toast.success(message);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }

    if (isError) {
      // toast.error("Mật khẩu không chính xác !");
      toast.error(errorMessage);
      dispatch(clearState());
    }
    // eslint-disable-next-line
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
              <Form className="login">
                <h3>Login</h3>

                <FastField
                  name={"username"}
                  component={InputField}
                  type={"text"}
                  placeholder={"Username"}
                />
                <FastField
                  name={"password"}
                  component={InputField}
                  type={"password"}
                  placeholder={"Password"}
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
                  Login
                </Button>

                <div className="text-left mt-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShow(true);
                      setModalText("Activate khách hàng này ?");
                    }}
                  >
                    <small className="reset">Password Reset</small>
                  </button>{" "}
                  II
                  <Link to={"/register"}>
                    <small className="reset ml-2">Register</small>
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Col>
      <Col className="mobile--hidden" lg={6} md={6} sm={12} xs={12}>
        <div className="login__form-right"></div>
      </Col>
      <ForgotPasswordModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
Login.propTypes = {
  onSubmit: PropTypes.func,
};

Login.defaulProps = {
  onSubmit: null,
};
