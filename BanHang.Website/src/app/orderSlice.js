import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

export const getUserOrder = createAsyncThunk('order/getUserOrder',async () => {
  const response = await orderApi.getUserOrder();
  console.log('response', response);
  return response;
})

export const getAllOrder = createAsyncThunk('order/getAllOrder',
  async ({PageIndex, PageSize, Username, FromDate, Status, ToDate, UserId}) => {
  const response = await orderApi.getAllOrder(PageIndex, PageSize, Username, FromDate, Status, ToDate, UserId);
  console.log('response', response);
  return response;
})

export const adminUpdateOrder = createAsyncThunk('order/adminUpdateOrder',
  async ({Id, ShipDate, Status}) => {
    const response = await orderApi.adminUpdateOrder(Id, ShipDate, Status);
    console.log('res: ', response)
    return response
  })

export const makeOrder = createAsyncThunk('order/makeOrder',
  async ({Address, Phone, Products}) => {
    const response = await orderApi.makeOrder(Address, Phone, Products);
    console.log("Response", response)
    return response
  })

export const userCancelOrder = createAsyncThunk('order/userCancelOrder',
  async ({orderId}) => {
    const response = await orderApi.userCancelOrder(orderId)
    console.log(response)
    return response
  })

export const getProceedsEachMonth = createAsyncThunk('order/getProceedsEachMonth',
  async () => {
  return await orderApi.getToTalProceedsEachMonth();
  })

const orderSlice = createSlice({
    name: "order",
    initialState: {
      orderResult: [],
      loading: false,
      errorMessage: "",
    },
    reducers: {


    },
    extraReducers: {
      [getUserOrder.pending]: (state) => {
        state.loading = true;
      },
      [getUserOrder.rejected]: (state, action) => {
        state.loading = false;
        state.errorMessage = action.error;
      },
      [getUserOrder.fulfilled]: (state, action) => {
        state.loading = false;
        // luu data vao state tren store
        state.orderResult = action.payload.result;
      },
    },
  });

  const { reducer: orderReducer } = orderSlice;
export default orderReducer;
  