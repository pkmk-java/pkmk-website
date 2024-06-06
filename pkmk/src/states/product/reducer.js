import { ActionType } from "./action";

function productReducer(products = [], action = {}) {
  switch (action.type) {
    // case ActionType.GET_ALL_PRODUCT:
    //   return action.payload.product
    case ActionType.ADD_PRODUCT:
      return [...products, action.payload.product]
    case ActionType.UPDATE_PRODUCT:
      return products.map(product => product.id === action.payload.product.id ? action.payload : product)
    case ActionType.DELETE_PRODUCT:
      return products.filter(product => product.id !== action.payload.productId)
    default:
      return products
  }
}

export default productReducer