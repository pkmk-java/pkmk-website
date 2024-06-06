import api from "../../utils/api"

// const ActionType = {
//   "GET_USERS": "GET_USERS"
// }
function asyncRegisterUser({ username, email, password }) {
  return async () => {
    try {
      await api.register({ username, email, password })
    } catch (err) {
      console.log(err.message)
    }
  }
}

export {
  asyncRegisterUser,
  // ActionType
}