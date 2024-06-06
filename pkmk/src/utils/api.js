
const api = (() => {
  const BASE_URL = ""

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers
      }
    }
    )
  }
  // function putAccessToken(token) {
  //   return localStorage.setItem("token", token)
  // }
  // function getAccessToken() {
  //   return localStorage.getItem("token")
  // }
  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email, password
        })
      }
    )
    const responseJson = await response.json()

    // const { data } = responseJson
    // return data
    return responseJson
  }
  async function register({ username, email, password }) {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, email, password
      })
    })
    const responseJson = await response.json()
    // const { data: { user } } = responseJson
    // return user
    return responseJson
  }
  return {
    _fetchWithAuth,
    // putAccessToken,
    // getAccessToken,
    login,
    register
  }
})()
export default api