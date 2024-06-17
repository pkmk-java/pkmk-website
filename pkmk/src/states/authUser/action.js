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
      const authUser = await api.getProfile()
      dispatch(setAuthUserActionCreator(authUser))
    } catch (err) {
      console.log(err.message)
      alert(err.message)
    }
  }
}
function asyncSetAuthAdmin({ email, password }) {
  return async (dispatch) => {
    try {
      const response = await api.loginAdmin({ email, password })
      dispatch(setAuthUserActionCreator(response))
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }
  }
}

function unsetAuthUser() {
  return (dispatch) => {
    localStorage.removeItem("_token")
    dispatch(unsetAuthUserActionCreator())
  }
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncSetAuthAdmin,
  unsetAuthUser,
}