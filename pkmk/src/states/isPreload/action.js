import { ActionType, setAuthUserActionCreator } from "../authUser/action";
import api from "../../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar"
const actionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: actionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const authUser = await api.getProfile()
      dispatch(setAuthUserActionCreator(authUser))
    } catch (error) {
      dispatch(setAuthUserActionCreator(null))
    }
    finally {
      dispatch(setIsPreloadActionCreator(false))
    }
    dispatch(hideLoading())
  }
}
export {
  asyncPreloadProcess,
  ActionType,
  setIsPreloadActionCreator
}