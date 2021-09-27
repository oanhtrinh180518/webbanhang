import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReportCard from "../../../components/shared/card/AdminDashCard/ReportCard";
import {
  TopMakeOrder,
  TopSpendTable,
} from "../../../components/admin/reportTable/";
import { useDispatch } from "react-redux";
import {
  getAllOrderWithoutPagi,
  getListProducts,
  getListUsers,
  getTopUsersMakeOrder,
  getTopUsersSpendMoney,
} from "../../../app/reportSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import OrderOverviewCard from "../../../components/shared/card/AdminDashCard/OrderOverviewCard";
import {
  BestSellingCard,
  TopSpendCard,
} from "../../../components/shared/card/AdminDashCard";
import { getBestSellingProduct } from "../../../app/productSlice";
import BarChart from "../../../components/admin/chart/BarChart";
import Skeleton from "react-loading-skeleton";
import { getProceedsEachMonth } from "../../../app/orderSlice";

const DashboardsItem = () => {
  const dispatch = useDispatch();
  const [topUsersMakeOrder, setTopUsersMakeOrder] = useState();
  const [allOrders, setAllOrders] = useState();
  const [listUsers, setListUsers] = useState();
  const [listProducts, setListProducts] = useState();
  const [bestSellingProducts, setBestSellingProducts] = useState();
  const [topUserSpendMoney, setTopUserSpendMoney] = useState();
  const [totalProceedsEachMonth, setTotalProceedsEachMonth] = useState();

  useEffect(() => {
    const onLoadData = () => {
      loadData();
    };
    onLoadData();
  }, []);
  const loadData = async () => {
    // get top users make most order
    const actionResult = await dispatch(getTopUsersMakeOrder());
    const dataPayload = await unwrapResult(actionResult);
    setTopUsersMakeOrder(dataPayload);

    //  get all orders
    const ordersResult = await dispatch(getAllOrderWithoutPagi());
    const allOrders = await unwrapResult(ordersResult);
    await setAllOrders(allOrders);

    //  get best selling products
    const bestSellingProducts = await unwrapResult(
      await dispatch(getBestSellingProduct({ pageIndex: 1, PageSize: 3 }))
    );
    setBestSellingProducts(bestSellingProducts.result.items);

    //  get top users spend money
    const topUsersSpend = await unwrapResult(
      await dispatch(getTopUsersSpendMoney())
    );
    setTopUserSpendMoney(topUsersSpend);

    //  get total Proceeds each Month
    const payload = await unwrapResult(await dispatch(getProceedsEachMonth()));
    setTotalProceedsEachMonth(payload.result);

    const listUsers = await unwrapResult(await dispatch(getListUsers()));
    setListUsers(listUsers);

    const listProducts = await unwrapResult(await dispatch(getListProducts()));
    setListProducts(listProducts);
  };
  //console.log(process.env.REACT_APP_API_URL);

  //console.log(bestSellingProducts)
  const filterOrderByStatus = (status) => {
    return allOrders.filter((order) => order.status === status);
  };
  return (
    <>
      <div className="admin__dashboard">
        <div className="admin__dashboard-header">
          <h5>{"ADMIN DASHBOARD" || <Skeleton duration={3} />}</h5>
        </div>
        <Row>
          <Col sm={6}>
            {totalProceedsEachMonth && (
              <BarChart chartData={totalProceedsEachMonth} />
            )}
          </Col>
          <Col sm={6}>
            {listUsers && (
              <Row className="m-t-30">
                <Col sm={6}>
                  <ReportCard
                    imgUrl={"img/icon/flatIcon/user_128.png"}
                    cardTitle={"Total users"}
                    qty={listUsers.length}
                    actQty={
                      listUsers &&
                      listUsers.filter((user) => user.active === true).length
                    }
                  />
                </Col>
                <Col sm={6}>
                  {listProducts && (
                    <ReportCard
                      imgUrl={"img/icon/flatIcon/vegetables_128.png"}
                      cardTitle={"Total products"}
                      qty={listProducts.length}
                    />
                  )}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <div className="admin__dashboard-content">
          <Row>
            {allOrders && (
              <div className="admin__dashboard-content--order-overview">
                <Col sm={3}>
                  <OrderOverviewCard
                    ordersData={filterOrderByStatus(1)}
                    status={1}
                    icon={"img/icon/flatIcon/order-pending_64.png"}
                  />
                </Col>
                <Col sm={3}>
                  <OrderOverviewCard
                    ordersData={filterOrderByStatus(2)}
                    status={2}
                    icon={"img/icon/flatIcon/order-processing_64.png"}
                  />
                </Col>
                <Col sm={3}>
                  <OrderOverviewCard
                    ordersData={filterOrderByStatus(0)}
                    status={0}
                    icon={"img/icon/flatIcon/order-canceled_64.png"}
                  />
                </Col>
                <Col sm={3}>
                  <OrderOverviewCard
                    ordersData={filterOrderByStatus(4)}
                    status={4}
                    icon={"img/icon/flatIcon/order-completed_64.png"}
                  />
                </Col>
              </div>
            )}
          </Row>

          <Row className="m-t-10">
            <Col sm={4}>
              {bestSellingProducts && (
                <BestSellingCard data={bestSellingProducts} />
              )}
            </Col>
            <Col sm={4}>
              {topUserSpendMoney && <TopSpendCard data={topUserSpendMoney} />}
            </Col>
            <Col sm={4}>
              {topUsersMakeOrder && <TopMakeOrder data={topUsersMakeOrder} />}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default DashboardsItem;
