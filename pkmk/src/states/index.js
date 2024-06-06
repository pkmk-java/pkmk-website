
import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import productReducer from "./product/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    product: productReducer
  }
})
export default store