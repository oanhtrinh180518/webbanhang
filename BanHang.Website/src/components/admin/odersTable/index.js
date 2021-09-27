import React from 'react';
import {Table} from 'react-bootstrap'
import OrderItem from "./OrderItem";

function Index({listOrder, reload, loadIndex, pageIndex, pageSize}) {
  console.log("list order",listOrder)
  function convert(str) {
    let date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }
  const handlePrice = (price) => {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
  }
  return (
    <div className="users__table">
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>🆔</th>
          <th>🙍‍Username</th>
          <th>📅Create date</th>
          <th>📅Ship date</th>
          <th>📞Phone number</th>
          <th>🗺Address</th>
          <th>💵Total price</th>
          <th>✔Status</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {
          listOrder.map((order, index) => {
            const createDate = convert(order.createDate);
            const shipDate = convert(order.shipDate);

            return (
              <OrderItem
                key={index}
                id={order.id}
                index={index}
                pageSize={pageSize}
                pageIndex={pageIndex}
                username={order.userName}
                createAt={createDate}
                shipDate={shipDate}
                address={order.address}
                phoneNumber={order.phone}
                status={order.status}
                totalPrice={handlePrice(order.totalPrice)}
                orderDetails={order.orderDetails}
                loadIndex={loadIndex}
                reload={(loadIndex) => reload(loadIndex)}
              />
            )
          })
        }
        </tbody>
      </Table>
    </div>
  );
}

export default Index;
