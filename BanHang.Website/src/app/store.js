import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import categoryReducer from "./categorySlice";
import commentReducer from "./commentSlice";

const rootReducer = {
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  category:categoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
