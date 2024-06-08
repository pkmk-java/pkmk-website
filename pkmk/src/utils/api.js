<<<<<<< HEAD
import Cookies from "js-cookie"
=======
import axios from "axios";

>>>>>>> a261d75 (fix)
const api = (() => {
  const BASE_URL = "https://pkmk-website.vercel.app";

<<<<<<< HEAD
  function putAccessToken(token) {
    return Cookies.set("_token", token)
=======
  async function _fetchWithAuth(url, options = {}) {
    // const token = getCookie("token")
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,

        // Authorization: `Bearer ${token}`
      },
      credentials: "include",
    });
>>>>>>> a261d75 (fix)
  }
  function getAccessToken() {
    return Cookies.get("_token")
  }
  async function loginAdmin({ email, password }) {
    const response = await fetch(`${BASE_URL}/api/pkmk-javac/admin/user`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password
      }),
    })

<<<<<<< HEAD
    const responseJson = await response.json()
    return responseJson
  }
  async function registerAdmin({ username, email, password }) {
    const response = await fetch(`${BASE_URL}/api/pkmk-javac/admin/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, email, password
      })
    })
    const responseJson = await response.json()

    return responseJson
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, email, password
      })
    })
    const responseJson = await response.json()
    return responseJson
  }

  return {
    loginUser,
    registerUser,
    loginAdmin,
    registerAdmin,
    putAccessToken,
    getAccessToken
  }
})()
export default api
=======
  async function login({ email, password }) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/pkmk-javac/admin/login`,
        {
          email: email,
          password: password,
        }
      );
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  async function register({ username, email, password }) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/pkmk-javac/admin/login`,
        {
          username: username,
          email: email,
          password: password,
        }
      );
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    _fetchWithAuth,
    login,
    register,
  };
})();
export default api;
>>>>>>> a261d75 (fix)
