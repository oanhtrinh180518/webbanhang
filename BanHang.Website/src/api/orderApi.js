import axiosClient from './axiosClient'


const orderApi = {
  getUserOrder: ()=>{
    return axiosClient.get(`${process.env.REACT_APP_API_URL}/order/getuserorder`);
  },

  getAllOrder : (PageIndex, PageSize, Username, FromDate, Status, ToDate, UserId ) => {
    const reqBody = JSON.stringify({
      PageIndex: PageIndex,
      PageSize: PageSize,
      UserName: Username,
      FromDate: FromDate,
      ToDate: ToDate,
      Status: Status,
      UserId: UserId
    })
    return axiosClient.post(`${process.env.REACT_APP_API_URL}/order/getallorder`, reqBody);
  },

  adminUpdateOrder: (Id, ShipDate, Status) => {
    const data = JSON.stringify({
      Id: Id,
      ShipDate: ShipDate,
      Status: Status
    })
    return axiosClient.put(`${process.env.REACT_APP_API_URL}/order/update`, data);
  },

  makeOrder: (Address, Phone, Products) => {
    const reqBody = JSON.stringify({
      Address: Address,
      Phone: Phone,
      Products: Products
    })
    return axiosClient.post(`${process.env.REACT_APP_API_URL}/order/create`, reqBody);
  },

  userCancelOrder : (orderId) => {
    return axiosClient.put(`${process.env.REACT_APP_API_URL}/order/cancelorder/${orderId}`);
  },

  getToTalProceedsEachMonth: () => {
    const data = JSON.stringify({
      YearF: 2021
    })
    return axiosClient.post(`${process.env.REACT_APP_API_URL}/order/ProceedsEachMonth`, data);
  }

}

export default orderApi
