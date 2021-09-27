import axiosClient from "./axiosClient";

const commentApi = {
  getAllCommentByProductId: (productId) => {
    return axiosClient.get(`${process.env.REACT_APP_API_URL}/comment/getall/${productId}`);
  },
  createComment: ( productId, content, rate) => {
    const data = JSON.stringify({
      productId,
      content,
      rate,
    });
    return axiosClient.post(`${process.env.REACT_APP_API_URL}/comment/create`, data);
  },
};
export default commentApi;
