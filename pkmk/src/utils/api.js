
const api = (() => {
  const BASE_URL = "https://pkmk-website.vercel.app"

  async function _fetchWithAuth(url, options = {}) {
    // const token = getCookie("token")
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,

        // Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    }
    )
  }
  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/api/pkmk-javac/admin/login`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email, password
        }),
        credentials: "include"
      }
    )
    console.log(response)
    // const { data } = responseJson
    // return data
  }
  async function register({ username, email, password }) {
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

  return {
    _fetchWithAuth,
    login,
    register
  }
})()
export default api