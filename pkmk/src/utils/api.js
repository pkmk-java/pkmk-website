// import Cookies from "js-cookie"
const api = (() => {
<<<<<<< HEAD
  const BASE_URL = "https://pkmk-website.vercel.app"
  function _fetchWithAuth(url, options = {}) {
=======
  const BASE_URL = "https://pkmk-website.vercel.app";

  async function _fetchWithAuth(url, options = {}) {
    // const token = getCookie("token")
>>>>>>> b785c5c21f2097f3d0a99dafbc95882bac592469
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
<<<<<<< HEAD
        // eslint-disable-next-line no-undef
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  }
  function putAccessToken(token) {
    return localStorage.setItem("_token", token)
=======

        // Authorization: `Bearer ${token}`
      },
      credentials: "include",
    });
>>>>>>> b785c5c21f2097f3d0a99dafbc95882bac592469
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
      throw new Error("Eror")
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
