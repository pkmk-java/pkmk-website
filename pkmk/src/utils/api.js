import Cookies from "js-cookie"
const api = (() => {
  const BASE_URL = "https://pkmk-website.vercel.app"

  function putAccessToken(token) {
    return Cookies.set("_token", token)
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