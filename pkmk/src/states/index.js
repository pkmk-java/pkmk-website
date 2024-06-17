
import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import productReducer from "./product/reducer";
import isPreloadReducer from "./isPreload/reducer";
import { loadingBarReducer } from "react-redux-loading-bar"
const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    product: productReducer,
    loadingBar: loadingBarReducer
  }
})
export default store