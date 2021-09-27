import {createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";
import reportApi from "../api/reportApi"

export const getTopUsersMakeOrder = createAsyncThunk('report/getTopUsersMakeOrder',
  async () => {
    try {
      const response = await reportApi.getTopUsersMakeOrder();
      return  response;
    } catch (e) {
      return isRejectedWithValue(e.response.data);
    }
  })

export const getAllOrderWithoutPagi = createAsyncThunk('report/getAllOrder',
  async () => {
    try {
      return await reportApi.getAllOrderWithoutPagi();
    } catch (e) {
      return isRejectedWithValue(e.response.data);
    }
  })

export const getTopUsersSpendMoney = createAsyncThunk('report/getTopUsersSpendMoney',
  async () => {
    try {
      return await reportApi.getTopUserSpendMoney();
    } catch (e) {
      return isRejectedWithValue(e.response.data)
    }
  })

export const getListUsers = createAsyncThunk('report/getListUsers',
  async () => {
  try {
    return await reportApi.getListUser();
  } catch (e) {
    return isRejectedWithValue(e.response.data)
  }
  })

export const getListProducts = createAsyncThunk('report/getListProducts',
  async () => {
  try {
    return await reportApi.getListProducts();
  } catch (e) {
    return isRejectedWithValue(e.response.data)
  }
  })