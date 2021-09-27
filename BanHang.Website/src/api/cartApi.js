import axiosClient from "./axiosClient";

const cartApi = {
  getAllCartByUerId: (PageIndex, PageSize) => {
    const data = JSON.stringify({
      PageIndex,
      PageSize,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/cart/getall`,
      data
    );
  },

  deleteCart: (productId) => {
    return axiosClient.delete(
      `${process.env.REACT_APP_API_URL}/cart/delete/${productId}`
    );
  },

  deleteAllCart: () => {
    return axiosClient.delete(
      `${process.env.REACT_APP_API_URL}/cart/deleteall`
    );
  },

  updateCart: (ProductId, Quantity) => {
    const data = JSON.stringify({ ProductId, Quantity });
    return axiosClient.put(
      `${process.env.REACT_APP_API_URL}/cart/update`,
      data
    );
  },

  updateCartPlus: (ProductId, Quantity) => {
    const data = JSON.stringify({ ProductId, Quantity });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/cart/updateplus`,
      data
    );
  },

  addToCart: (ProductId, Quantity) => {
    const data = JSON.stringify({
      ProductId,
      Quantity,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/cart/addtocart`,
      data
    );
  },
};

export default cartApi;
