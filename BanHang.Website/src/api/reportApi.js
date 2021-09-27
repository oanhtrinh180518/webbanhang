import axiosClient from "./axiosClient";

const reportApi = {
  getTopUsersMakeOrder: () => {
    return axiosClient.get(`${process.env.REACT_APP_API_URL}/report/get-topusers-makeorder`)
  },

  // get all order without pagination
  getAllOrderWithoutPagi: () => {
    return axiosClient.get(`${process.env.REACT_APP_API_URL}/report/getallorder`)
  },

  // get top users spend money
  getTopUserSpendMoney: () => {
    return axiosClient.get(`${process.env.REACT_APP_API_URL}/report/gettopspendmoney`)
  },

  getListUser: () => {
    return axiosClient.get(`${process.env.REACT_APP_API_URL}/report/getlistusers`)
  },

  getListProducts: () => {
    return axiosClient.get(`${process.env.REACT_APP_API_URL}/report/getlistproducts`)
  }
}
export default reportApi