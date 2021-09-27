import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../api/productApi";

// Tao async action
export const getAllProduct = createAsyncThunk(
  "product/search",
  async (
    {
      PageIndex,
      PageSize,
      PriceFrom,
      PriceTo,
      SupplierName,
      CategoryName,
      Weight,
      IsRate,
      Search,
      SortBy,
    },
    thunkAPI
  ) => {
    const response = await productApi.getAllProduct(
      PageIndex,
      PageSize,
      PriceFrom,
      PriceTo,
      SupplierName,
      CategoryName,
      Weight,
      IsRate,
      Search,
      SortBy
    );
    // console.log("response",PriceFrom);
    return response;
  }
);
export const getAllProductAdmin = createAsyncThunk(
  "product/search-admin",
  async (
    {
      PageIndex,
      PageSize,
      PriceFrom,
      PriceTo,
      SupplierName,
      CategoryName,
      Weight,
      IsRate,
      ProductName,
      //start
      SortBy,
      //end
    },
    thunkAPI
  ) => {
    const response = await productApi.getAllProductAdmin(
      PageIndex,
      PageSize,
      PriceFrom,
      PriceTo,
      SupplierName,
      CategoryName,
      Weight,
      IsRate,
      ProductName,
      //start
      SortBy
      //end
    );
    return response;
  }
);
export const getAllProductRate = createAsyncThunk(
  "product/search-rate",
  async ({ PageIndex, PageSize, IsRate }, thunkAPI) => {
    const response = await productApi.getAllProductRate(
      PageIndex,
      PageSize,
      IsRate
    );
    // console.log("response",PriceFrom);
    return response;
  }
);
export const getProductById = createAsyncThunk(
  "product/getbyProductId",
  async (productId) => {
    const response = await productApi.getProductById(productId);
    return response;
  }
);
export const createProduct = createAsyncThunk(
  "product/create",
  async ({
    CategoryId,
    Name,
    Description,
    UnitPrice,
    AvailableQuantity,
    Weight,
    ImagesProduct,
    SupplierId,
    CreateDate,
    ExpDate,
  }) => {
    const response = await productApi.createProduct(
      CategoryId,
      Name,
      Description,
      UnitPrice,
      AvailableQuantity,
      Weight,
      ImagesProduct,
      SupplierId,
      CreateDate,
      ExpDate
    );
    console.log(response);
    return response;
  }
);
export const updateStatusProduct = createAsyncThunk(
  "product/updatestatus",
  async ({ id, status }) => {
    return await productApi.updateStatusProduct(id, status);
  }
);
export const getBestSellingProduct = createAsyncThunk(
  "product/getBestSellingProduct",
  async ({ PageIndex, PageSize }) => {
    const response = await productApi.getBestSellingProduct(
      PageIndex,
      PageSize
    );
    console.log("Response", response);
    return response;
  }
);
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({
    Id,
    Name,
    CategoryId,
    SupplierId,
    Description,
    UnitPrice,
    AvailableQuantity,
    Weight,
    ImagesProduct,
    CreateDate,
    ExpDate,
  }) => {
    return await productApi.updateProduct(
      Id,
      Name,
      CategoryId,
      SupplierId,
      Description,
      UnitPrice,
      AvailableQuantity,
      Weight,
      ImagesProduct,
      CreateDate,
      ExpDate
    );
  }
);

export const createPicture = createAsyncThunk(
  "picture/create",
  async ({ ProductId, File }) => {
    return await productApi.createPicture(ProductId, File);
  }
);
export const getWeight = createAsyncThunk("product/getweight", async () => {
  return await productApi.getWeight();
});
// export const searchProduct=createAsyncThunk("product/search2",
//   async({Search}) => {
//     return await productApi.searchProduct(Search);
//   }
// )
const productSlice = createSlice({
  name: "product",
  initialState: {
    productResult: [],
    productResult2: [],
    loading: false,
    error: "",
    // productFull:null,
    total: null,
  },
  reducers: {},
  extraReducers: {
    [getAllProduct.pending]: (state) => {
      state.loading = true;
    },

    [getAllProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [getAllProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.productResult = action.payload.result.items;
      state.total = action.payload.result.totalRecords;
    },

    //search product admin
    [getAllProductAdmin.pending]: (state) => {
      state.loading = true;
    },
    [getAllProductAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getAllProductAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.productResult2 = action.payload.result.items;
    },
  },
});

const { reducer: productReducer } = productSlice;
export default productReducer;
