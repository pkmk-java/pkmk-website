
const ActionType = {
  // "GET_ALL_PRODUCT": "GET_ALL_PRODUCT",
  "ADD_PRODUCT": "ADD_PRODUCT",
  "UPDATE_PRODUCT": "UPDATE_PRODUCT",
  "DELETE_PRODUCT": "DELETE_PRODUCT"
}

function addProductActionCreator(product) {
  return {
    type: ActionType.ADD_PRODUCT,
    payload: {
      product
    }
  }
}

function updateProductActionCreator(product) {
  return {
    type: ActionType.UPDATE_PRODUCT,
    payload: {
      product
    }
  }
}

function deleteProductActionCreator(productId) {
  return {
    type: ActionType.DELETE_PRODUCT,
    payload: {
      productId
    }
  }
}

export {
  ActionType,
  addProductActionCreator,
  updateProductActionCreator,
  deleteProductActionCreator
}