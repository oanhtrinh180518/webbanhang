import React from 'react';

function OrderOverviewCard({ordersData, status, icon}) {
  const getTitle = (status) => {
    switch (status) {
      case 0: return <h6>ORDER CANCELED</h6>
      case 1: return <h6>ORDER PENDING</h6>
      case 2: return <h6>ORDER PROCESSING</h6>
      case 3: return <h6>ON DELIVERY</h6>
      case 4: return <h6>ORDER COMPLETED</h6>
      default : return <></>
    }
  }
  return (
    <>
      <div className="order-overview__card">
        <div className="order-overview__card-content">
          {getTitle(status)}
          <span>{ordersData.length}</span>
        </div>
        <div className="order-overview__card-icon">
          <img src={process.env.PUBLIC_URL + icon} alt=""/>
        </div>
      </div>
    </>
  );
}

export default OrderOverviewCard;