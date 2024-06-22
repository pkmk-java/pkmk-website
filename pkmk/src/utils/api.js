// import Cookies from "js-cookie"
const api = (() => {
  const BASE_URL = "http://localhost:3000"
  function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        // eslint-disable-next-line no-undef
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  }
  function putAccessToken(token) {
    return localStorage.setItem("_token", token)
  }
  function getAccessToken() {
    return localStorage.getItem("_token")
  }

  async function loginUser({ email, password }) {
    const response = await fetch(`${BASE_URL}/api/pkmk-javac/user/login`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password
        }),
        credentials: "include"
      }
    )
    const responseJson = await response.json()
    const { isUserExist, token } = responseJson
    return { isUserExist, token }
  }

  async function registerUser({ username, email, password }) {
    const response = await fetch(`${BASE_URL}/api/pkmk-javac/user/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
    const responseJson = await response.json()
    return responseJson
  }

  async function registerAdmin({ username, email, password }) {
    const response = await fetch(`${BASE_URL}/api/pkmk-javac/admin/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
    const responseJson = await response.json()
    return responseJson
  }
  async function loginAdmin({ email, password }) {
    const response = await fetch(`${BASE_URL}/api/pkmk-javac/admin/login`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password
        }),
        credentials: "include"
      }
    )
    const responseJson = await response.json()
    const { isAdminExist } = responseJson
    return isAdminExist
  }
  async function getProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/api/pkmk-javac/user/me`)
    const responseJson = await response.json()
    const { user, msg } = responseJson
    if (msg !== "success") {
      throw new Error("")
    }
    return user
  }

  return {
    loginUser,
    registerUser,
    putAccessToken,
    getAccessToken,
    registerAdmin,
    loginAdmin,
    getProfile
  }
})()
export default api