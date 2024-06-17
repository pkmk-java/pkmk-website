import api from "../../utils/api"

// const ActionType = {
//   "GET_USERS": "GET_USERS"
// }
function asyncRegisterUser({ username, email, password }) {
  return async () => {
    try {
      await api.registerUser({ username, email, password })
      console.log({ username, email, password })
    } catch (err) {
      console.log(err.message)
    }
  }
}
function asyncRegisterAdmin({ username, email, password }) {
  return async () => {
    try {
      await api.registerAdmin({ username, email, password })
    } catch (error) {
      console.log(error.message)
    }
  }
}
export {
  asyncRegisterUser,
  asyncRegisterAdmin
  // ActionType
}