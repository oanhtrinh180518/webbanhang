import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { FastField, Form, Formik } from "formik";
import InputField from "../../components/shared/custom-fields/InputField/InputField";
import { InputSelectStatus } from "../../components/shared/custom-fields/InputSelect/InputSelect";
import CustomPagination from "../../components/shared/pagination/CustomPagination";
import OrderTable from "../../components/admin/odersTable/index";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateActive, getAllUsernames } from "../../app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getAllOrder } from "../../app/orderSlice";
import ReactSelectCustom from "../../components/shared/custom-fields/React-Select/ReactSelectCustom";
// img
import OrderIcons from "../../assets/img/icon/flatIcon/order-management_128.png";
import UserTable from "../../components/admin/usersTable";

function OrderManage(props) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [loadingData, setLoadingData] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState({});
  const [values, setValues] = useState({});
  const [options, setOptions] = useState(null);
  const [reLoad, setReload] = useState(0);
  useEffect(() => {
    const loadData = async () => {
      await onLoadData(values);
      console.log("Values", values);
    };
    loadData();
    console.log("ValueState: ", values);
    // eslint-disable-next-line
  }, [pageIndex, loadingData, reLoad]);

  const initialValues = {
    // UserName: '',
    FromDate: null,
    ToDate: null,
    Status: null,
  };
  const onLoadData = async (values) => {
    const actionResult = await dispatch(
      getAllOrder({ ...values, PageIndex: pageIndex, PageSize: 10 })
    );

    const apiResults = await unwrapResult(actionResult);
    const items = apiResults.result.items;
    console.log(apiResults.result);
    console.log("items", items);
    setPagination(apiResults.result);
    // console.log('items', items);
    setListOrder(items);
    // setLoading(order.loading)
    // username filter options
    const allUsernames = await unwrapResult(await dispatch(getAllUsernames()));
    console.log("all users", allUsernames);
    // const usernames = new Set(allUsernames.map((item) => item.username));
    // console.log(usernames);
    const usernameItems = allUsernames.map((item) => ({
      value: item.username,
      label: item.username,
    }));
    // console.log(usernameItems);
    // const usernameOption = usernameItems.reduce((acc, curr) => {
    //   const x = acc.find((item) => item.value === curr.value);
    //   if (!x) {
    //     return acc.concat([curr]);
    //   } else {
    //     return acc;
    //   }
    // }, []);
    // console.log(usernameOption);
    // setOptions(usernameOption);
    setOptions(usernameItems);
  };
  const handleSubmit = async (values) => {
    const newValues = { ...values, Status: parseInt(values.Status) };
    console.log("Submit value 2: ", newValues);

    setValues(newValues);
    await onLoadData(newValues);
  };

  const updateActive = () => {
    const actionResult = dispatch(adminUpdateActive());
  };
  return (
    <>
      <div className="admin__users p-t-50">
        <Container fluid>
          <div className="admin__users-header text-center">
            <img className="admin__users-header-img" src={OrderIcons} alt="" />
            <h3 className={"m-b-30 font-weight-bold"}>ORDER MANAGEMENT</h3>
          </div>
          <div className="admin__users-form ">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {(formikProps) => {
                const { values, errors, touched, isSubmitting } = formikProps;
                return (
                  <Form>
                    <Row className="justify-content-center">
                      {options && (
                        <Col sm={3}>
                          <label htmlFor="UserName">Username:</label>
                          <FastField
                            name={"Username"}
                            component={ReactSelectCustom}
                            options={options}
                          />
                        </Col>
                      )}
                      <Col sm={3}>
                        <label htmlFor="FromDate">From:</label>
                        <FastField
                          name={"FromDate"}
                          component={InputField}
                          type={"date"}
                        />
                      </Col>
                      <Col sm={3}>
                        <label htmlFor="ToDate">To:</label>
                        <FastField
                          name={"ToDate"}
                          component={InputField}
                          type={"date"}
                        />
                      </Col>

                      <Col sm={2}>
                        <label htmlFor="Status">Status</label>
                        <FastField
                          name={"Status"}
                          component={InputSelectStatus}
                          {...formikProps.getFieldProps("Status")}
                        />
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button type={"submit"} variant="info">
                        {isSubmitting && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        Tìm kiếm
                      </Button>
                    </div>
                    {/*<UpdateOrderModal />*/}
                    {/*updateActive={updateActive}*/}
                  </Form>
                );
              }}
            </Formik>
          </div>
          <Row className={"m-b-20 justify-content-between m-t-10"}>
            {pagination && (
              <h6 className="d-block my-auto mx-0">
                Showing {10 * (pageIndex - 1) + 1}-{10 * pageIndex} of{" "}
                <span className="text-primary">{pagination.totalRecords}</span>{" "}
                results
              </h6>
            )}
            <CustomPagination
              pagination={pagination}
              page={pageIndex}
              setPage={(page) => setPageIndex(page)}
            />
          </Row>
          <Row>
            <OrderTable
              pageSize={10}
              pageIndex={pageIndex}
              listOrder={listOrder}
              loadIndex={reLoad}
              reload={(loadIndex) => setReload(loadIndex)}
            />
          </Row>
        </Container>
      </div>
    </>
  );
}

export default OrderManage;
