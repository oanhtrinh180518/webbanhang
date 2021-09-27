import React, { useState } from "react";
import OrderList from "../../order/OrderList";
import Table from "react-bootstrap/Table";

function OrdersTable({ orders, reload }) {
  const [visible, setVisible] = useState(3);
  function convert(str) {
    let date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }
  const handleShowMore = () => {
    setVisible((prevValue) => prevValue + 2);
  };
  const handleHideOrders = () => {
    setVisible(3);
  };
  return orders && orders.length === 0 ? (
    <div className="text-center">
      <img
        src={process.env.PUBLIC_URL + "img/icon/flatIcon/order-empty_64.png"}
        alt=""
      />
      <h6 className="m-t-10 text--gray">No orders yet</h6>
    </div>
  ) : (
    <>
      <Table className="order__tables" bordered hover>
        <thead>
          <th className="text-center">NO</th>
          <th className="text-center">CODE</th>
          <th className="text-center">CREATE DATE</th>
          <th className="text-center">TOTAL PRICE</th>
          <th className="text-center">STATUS</th>
          <th className="text-center">VIEW</th>
          <th className="text-center">CANCEL</th>
        </thead>
        <tbody>
          {orders &&
            orders.slice(0, visible).map((order, index) => {
              const createDate = convert(order.createDate);
              const shipDate = convert(order.shipDate);
              return (
                <OrderList
                  username={order.userName}
                  shipDate={shipDate}
                  key={index}
                  order={order}
                  no={index + 1}
                  date={createDate}
                  totalPrice={order.totalPrice}
                  status={order.status}
                  orderId={order.id}
                  reload={(loadIndex) => reload(loadIndex)}
                />
              );
            })}
        </tbody>
      </Table>
      <div>
        {orders && orders.length >= 3 && orders.length > visible && (
          <button
            className="showMore_btn m-r-20"
            onClick={() => handleShowMore()}
          >
            Show more
          </button>
        )}
        {orders && orders.length > 3 && visible > 3 && (
          <button className="showMore_btn" onClick={() => handleHideOrders()}>
            Hide away
          </button>
        )}
      </div>
    </>
  );
}

export default OrdersTable;
