
const api = (() => {
  // const BASE_URL = ""

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers
      }
    }
    )
  }
  function putAccessToken(token) {
    return localStorage.setItem("token", token)
  }
  function getAccessToken() {
    return localStorage.getItem("token")
  }
  return {
    _fetchWithAuth,
    putAccessToken,
    getAccessToken

  }
})()
export default api