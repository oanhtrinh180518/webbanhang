import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import supplierApi from "../api/supplierApi";


// Tao async action
export const getAllSupplier = createAsyncThunk('supplier/getall',
  async () => {
   const response = await supplierApi.getAllSupplier({});
   console.log("res",response);
    return response;
})

const supplierSlice = createSlice({
  name: 'supplier',
  initialState:{
    supplierResult:[],
    loading: false,
    error:'',
  },
  reducers: {
  },
  extraReducers: {
    
  }
});
const {reducer: supplierReducer} = supplierSlice;
export default supplierReducer;
