import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Tab, Row, Col, Nav, Container, Button } from "react-bootstrap";
import { FaRegUserCircle, FaUserLock } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Formik, Form, FastField } from "formik";
import InputField from "../../components/shared/custom-fields/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo, userSelector } from "../../app/userSlice";
import * as Yup from "yup";
import { InputSelect } from "../../components/shared/custom-fields/InputSelect/InputSelect";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, Toaster } from "react-hot-toast";
import { getUserOrder } from "../../app/orderSlice";
import Tabs from "../../components/shared/tab/Tabs";
import OrdersTable from "../../components/shared/table/OrdersTable";
import ChangePassword from "../auth/ChangePassword";

function UserProfile(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(userSelector);
  const [orders, setOrders] = useState();
  const [pendingOrders, setPendingOrders] = useState();
  const [processingOrders, setProcessingOrders] = useState();
  const [onDeliveryOrders, setOnDeliveryOrders] = useState();
  const [completedOrders, setCompletedOrders] = useState();
  const [canceledOrder, setCanceledOrders] = useState();
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const loadOrder = async () => {
      await loadData();
    };

    loadOrder();
    // eslint-disable-next-line
  }, [reload]);

  async function loadData() {
    const orderResult = await dispatch(getUserOrder());
    // console.log("orderResult",orderResult.payload);
    const orderItems = await unwrapResult(orderResult);
    console.log("orderItems", orderItems);
    setOrders(orderItems);
    const penOrderItems = orderItems.filter((item) => item.status === 1);
    const procOrderItems = orderItems.filter((item) => item.status === 2);
    const onDelOrderItems = orderItems.filter((item) => item.status === 3);
    const completedOrderItems = orderItems.filter((item) => item.status === 4);
    const canceledOrderItems = orderItems.filter((item) => item.status === 0);
    setPendingOrders(penOrderItems);
    setProcessingOrders(procOrderItems);
    setOnDeliveryOrders(onDelOrderItems);
    setCompletedOrders(completedOrderItems);
    setCanceledOrders(canceledOrderItems);
  }
  function convert(str) {
    let date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  const [initialValues, setInitialValues] = useState({
    FullName: "",
    Username: "",
    Email: "",
    PhoneNumber: "",
    Age: null,
    Birthday: null,
    Gender: null,
    Address: "",
  });
  function onLoad() {
    const {
      fullName,
      userName,
      age,
      birthday,
      gender,
      phoneNumber,
      address,
      email,
    } = userInfo;
    const newBirthday = convert(new Date(birthday));
    // console.log('Bd', newBirthday)
    setInitialValues({
      FullName: fullName,
      Username: userName,
      Email: email,
      PhoneNumber: phoneNumber,
      Age: age,
      Birthday: newBirthday,
      Gender: gender,
      Address: address,
    });
  }
  useEffect(() => {
    userInfo && onLoad();
    // eslint-disable-next-line
  }, [userInfo]);

  const validationSchema = Yup.object().shape({
    FullName: Yup.string().required("Full name is require,"),
    Username: Yup.string().required("This field is require."),
    Email: Yup.string().email("Email is invalid").required("Email is require."),
    PhoneNumber: Yup.string().required("This field is require."),
    Age: Yup.string().required("This field is require."),
    Birthday: Yup.string().required("This field is require."),
    Gender: Yup.string().required("This field is require."),
    Address: Yup.string().required("This field is require."),
  });

  const handleSubmit = async (values) => {
    const newValues = {
      ...values,
      Gender: parseInt(values.Gender),
    };
    console.log(newValues);
    const action = await updateUserInfo(newValues);
    const actionResult = await dispatch(action);
    console.log("AcResult", actionResult);
    console.log("Result", unwrapResult(actionResult));
    toast.success("Cập nhật thông tin thành công!");
  };
  const header = [
    { id: "pending", title: "Pending" },
    { id: "processing", title: "Processing" },
    { id: "onDelivery", title: "On Delivery" },
    { id: "completed", title: "Completed" },
    { id: "canceled", title: "Canceled" },
  ];
  return (
    <Container>
      <Toaster />
      <div className="user__profile p-b-100">
        {userInfo && !userInfo ? (
          history.push("/401-unauthorized-page")
        ) : (
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col xs={12} sm={12} md={12} lg={3}>
                <Nav variant="pills" className="flex-column user__profile-nav">
                  <Nav.Item>
                    <Nav.Link
                      className={"d-flex align-items-center"}
                      eventKey="first"
                    >
                      <FaRegUserCircle className={"mr-1"} />
                      User information
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={"d-flex align-items-center"}
                      eventKey="second"
                    >
                      <FiShoppingCart className={"mr-1"} />
                      Order
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={"d-flex align-items-center"}
                      eventKey="third"
                    >
                      <FaUserLock className={"mr-1"} />
                      Change password
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col xs={12} sm={12} md={12} lg={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="tab__content">
                      <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {(formikProps) => {
                          return (
                            <Form className={"tab__content-form"}>
                              <Row>
                                <Col sm={6}>
                                  <label htmlFor="FullName">Full Name</label>
                                  <FastField
                                    name={"FullName"}
                                    component={InputField}
                                    {...formikProps.getFieldProps("FullName")}
                                    type={"text"}
                                    placeholder={"Full Name"}
                                  />
                                </Col>
                                <Col sm={6}>
                                  <label htmlFor="Username">Username</label>
                                  <FastField
                                    name={"Username"}
                                    component={InputField}
                                    {...formikProps.getFieldProps("Username")}
                                    disabled={true}
                                    type={"text"}
                                    placeholder={"User Name"}
                                  />
                                </Col>
                                <Col sm={6}>
                                  <label htmlFor="Email">Email</label>
                                  <FastField
                                    name={"Email"}
                                    component={InputField}
                                    {...formikProps.getFieldProps("Email")}
                                    disabled={true}
                                    type={"text"}
                                    placeholder={"Email"}
                                  />
                                </Col>
                                <Col sm={6}>
                                  <label htmlFor="PhoneNumber">
                                    PhoneNumber
                                  </label>
                                  <FastField
                                    name={"PhoneNumber"}
                                    component={InputField}
                                    {...formikProps.getFieldProps(
                                      "PhoneNumber"
                                    )}
                                    type={"text"}
                                    placeholder={"PhoneNumber"}
                                  />
                                </Col>
                                <Col sm={4}>
                                  <label htmlFor="Age">Age</label>
                                  <FastField
                                    name={"Age"}
                                    component={InputField}
                                    {...formikProps.getFieldProps("Age")}
                                    disabled={true}
                                    type={"number"}
                                  />
                                </Col>
                                <Col sm={4}>
                                  <label htmlFor="Birthday">Birthday</label>
                                  <FastField
                                    name={"Birthday"}
                                    component={InputField}
                                    {...formikProps.getFieldProps("Birthday")}
                                    type={"date"}
                                  />
                                </Col>
                                <Col sm={4}>
                                  <label htmlFor="Gender">Gender</label>
                                  <FastField
                                    name={"Gender"}
                                    component={InputSelect}
                                    {...formikProps.getFieldProps("Gender")}
                                    type={"number"}
                                  />
                                </Col>
                                <Col sm={12}>
                                  <label htmlFor="Address">Address</label>
                                  <FastField
                                    name={"Address"}
                                    component={InputField}
                                    {...formikProps.getFieldProps("Address")}
                                    type={"text"}
                                  />
                                </Col>
                              </Row>
                              {userInfo ? (
                                <Button
                                  variant={"primary"}
                                  className={"tab__content-btn"}
                                  type="submit"
                                >
                                  Save
                                </Button>
                              ) : (
                                <Button
                                  disabled
                                  variant={"primary"}
                                  className={"tab__content-btn"}
                                  type="submit"
                                >
                                  Save
                                </Button>
                              )}
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Tabs headers={header} defaultId="pending">
                      <div id="pending">
                        <OrdersTable
                          orders={pendingOrders}
                          reload={(loadIndex) => setReload(loadIndex)}
                        />
                      </div>
                      <div id="processing">
                        <OrdersTable
                          orders={processingOrders}
                          reload={(loadIndex) => setReload(loadIndex)}
                        />
                      </div>
                      <div id="onDelivery">
                        <OrdersTable
                          orders={onDeliveryOrders}
                          reload={(loadIndex) => setReload(loadIndex)}
                        />
                      </div>
                      <div id="completed">
                        <OrdersTable
                          orders={completedOrders}
                          reload={(loadIndex) => setReload(loadIndex)}
                        />
                      </div>
                      <div id="canceled">
                        <OrdersTable
                          orders={canceledOrder}
                          reload={(loadIndex) => setReload(loadIndex)}
                        />
                      </div>
                    </Tabs>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <div className="tab__content">
                      <ChangePassword />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        )}
      </div>
    </Container>
  );
}

export default UserProfile;
