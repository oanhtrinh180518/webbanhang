import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import categoryApi from "../api/categoryApi";


// Tao async action
export const getAllCategory = createAsyncThunk('categpory/getall',
  async () => {
    return await categoryApi.getAll({});
})
const categorySlice = createSlice({
  name: 'category',
  initialState:{
    categoryResult:[],
    loading: false,
    error:'',
  },
  reducers: {
  },
  extraReducers: {
    [getAllCategory.pending]: (state) => {
      state.loading = true;
    },
    //rejected: error
    [getAllCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    //fulfilled: ok, cu phap: trang thai.fulfilled => ex. getAll.fulfilled
    [getAllCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.categoryResult = action.payload.result;
    },
  }
});

const {reducer: categoryReducer} = categorySlice;
export default categoryReducer;
