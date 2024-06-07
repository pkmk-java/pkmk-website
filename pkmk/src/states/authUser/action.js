import api from "../../utils/api"
const ActionType = {
  "SET_AUTH_USER": "SET_AUTH_USER",
  "UNSET_AUTH_USER": "UNSET_AUTH_USER"
}

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  }
}
function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null
    }
  }
}
function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const response = await api.loginUser({ email, password })
      api.putAccessToken(response.token)
      dispatch(setAuthUserActionCreator(response.isUserExist))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser
}