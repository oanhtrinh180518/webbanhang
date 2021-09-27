import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";

export const getAllCartByUerId = createAsyncThunk(
  "cart/getAllCartByUerId",
  async ({ PageIndex, PageSize }) => {
    // console.log('response', response);
    return await cartApi.getAllCartByUerId(
      (PageIndex = 1),
      (PageSize = 9)
    );
  }
);
export const addToCart = createAsyncThunk(
  "cart/addtocart",
  async ({ ProductId, Quantity }) => {
    // console.log('response', response);
    return await cartApi.addToCart(ProductId, Quantity);
  }
);
export const deleteACart=createAsyncThunk(
  "cart/delete",
  async({productId})=>{
    return await cartApi.deleteCart(productId);
  }
)
export const deleteAllCart=createAsyncThunk(
  "cart/deleteall",
  async()=>{
    return await cartApi.deleteAllCart();
  }
)
export const updateCart=createAsyncThunk(
  "cart/update",
  async({ProductId,Quantity}) =>{
    return await cartApi.updateCart(ProductId, Quantity);
  }
)
export const updateCartPlus=createAsyncThunk(
  "cart/updateCartPlus",
  async({ProductId,Quantity}) =>{
    return await cartApi.updateCartPlus(ProductId, Quantity);
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartResult: [],
    loading: false,
    errorMessage: "",
    reloadIndex: 0
  },
  reducers: {
    clearCart: (state) => state.cartResult = 1
  },
  extraReducers: {
    [getAllCartByUerId.pending]: (state) => {
      state.loading = true;
    },
    [getAllCartByUerId.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.error;
    },
    [getAllCartByUerId.fulfilled]: (state, action) => {
      state.loading = false;
      // luu data vao state tren store
      state.cartResult = action.payload.result.items;
    },
  },
});

const {actions, reducer: cartReducer } = cartSlice;
export const { clearCart } = actions;
export default cartReducer;
export const cartSelector = (state) => state.cart;
