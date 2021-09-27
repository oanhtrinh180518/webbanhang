import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import UserTable from "../../components/admin/usersTable";
import { Formik, Form, FastField } from "formik";
import InputField from "../../components/shared/custom-fields/InputField/InputField";
import { InputSelectActive } from "../../components/shared/custom-fields/InputSelect/InputSelect";
import { ConfirmModal } from "../../components/shared/Modal/ConfirmModal";
import { useDispatch } from "react-redux";
import { adminUpdateActive, getAllMember } from "../../app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomPagination from "../../components/shared/pagination/CustomPagination";
import UsersIcon from "../../assets/img/icon/flatIcon/users-management_128.png";

export default function UsersManage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [listMember, setListMember] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState({});
  const [values, setValues] = useState({});
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const loadData = async () => {
      await onLoadData(values);
      console.log("Values", values);
    };
    loadData();
    console.log("ValueState: ", values);
    // eslint-disable-next-line
  }, [pageIndex, loading, reload]);

  const initialValues = {
    FullName: "",
    UserName: "",
    PhoneNumber: "",
    Active: null,
  };
  const onLoadData = async (values) => {
    const actionResult = await dispatch(
      getAllMember({ ...values, PageIndex: pageIndex, PageSize: 10 })
    );
    const apiResults = await unwrapResult(actionResult);
    const items = apiResults.result.items;
    console.log(apiResults.result);
    setPagination(apiResults.result);
    // console.log('items', items);
    setListMember(items);
  };
  const handleSubmit = async (values) => {
    switch (values.Active) {
      case "true":
        values.Active = true;
        break;
      case true:
        values.Active = true;
        break;
      case "false":
        values.Active = false;
        break;
      case false:
        values.Active = true;
        break;
      default:
        values.Active = null;
    }
    setValues(values);
    console.log("Submit value 2: ", values);
    await onLoadData(values);
  };

  const updateActive = () => {
    const actionResult = dispatch(adminUpdateActive());
  };
  useEffect(() => {}, [listMember]);
  console.log("Pagination", pagination);
  return (
    <div className="admin__users p-t-50">
      <Container fluid>
        <div className="admin__users-header text-center">
          <img className="admin__users-header-img" src={UsersIcon} alt="" />
          <h3 className={"m-b-30 font-weight-bold"}>USER MANAGEMENT</h3>
        </div>
        <div className="admin__users-form">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(formikProps) => {
              const { values, errors, touched, isSubmitting } = formikProps;
              return (
                <Form>
                  <Row className="justify-content-center">
                    <Col sm={2}>
                      <label htmlFor="FullName">Full Name:</label>
                      <FastField
                        name={"FullName"}
                        component={InputField}
                        type={"text"}
                        placeholder={"Full name"}
                      />
                    </Col>
                    <Col sm={2}>
                      <label htmlFor="UserName">User Name:</label>
                      <FastField
                        name={"UserName"}
                        component={InputField}
                        type={"text"}
                        placeholder={"User name"}
                      />
                    </Col>
                    <Col sm={2}>
                      <label htmlFor="PhoneNumber">Phone Number:</label>
                      <FastField
                        name={"PhoneNumber"}
                        component={InputField}
                        type={"text"}
                        placeholder={"Phone Number"}
                      />
                    </Col>
                    <Col sm={2}>
                      <label htmlFor="Active">Active</label>
                      <FastField
                        name={"Active"}
                        component={InputSelectActive}
                        {...formikProps.getFieldProps("Active")}
                      />
                    </Col>
                  </Row>
                  <div className="btn-block text-center">
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
                  {/*<ConfirmModal*/}
                  {/*  setLoad={(isLoad) => setLoading(isLoad)}*/}
                  {/*/>*/}
                  {/*updateActive={updateActive}*/}
                </Form>
              );
            }}
          </Formik>
        </div>
        <Row className={"m-b-20 justify-content-between m-t-10"}>
          {pagination && (
            // <p className="d-block my-auto mx-0">
            //   <span className="text-primary">{pagination.totalRecords}</span>
            //   &nbsp;records found
            // </p>
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
          {console.log(listMember)}
          <UserTable
            pageSize={10}
            pageIndex={pageIndex}
            listMember={listMember}
            loadIndex={reload}
            reload={(loadIndex) => setReload(loadIndex)}
          />
        </Row>
      </Container>
    </div>
  );
}
