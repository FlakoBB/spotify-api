import getCode from './getCode.js'
import refreshAccessToken from './refreshToken.js'
import requestAccessToken from './requestAccessToken.js'

const client_secret = 'MY_CLIENT_SECRET'
const client_id = 'MY_CLIENT_ID'
let accessToken = undefined
const api = 'https://api.spotify.com'
const redirect_uri = 'http://localhost:5500'
const urlParams = new URLSearchParams(window.location.search)
const code = urlParams.get('code')

if (!code) {
  getCode(client_id, redirect_uri)
} else {
  const tokenObject = await requestAccessToken(client_id, client_secret, code, redirect_uri)
  accessToken = tokenObject.access_token
  const refresh_token = tokenObject.refresh_token
  
  setTimeout(async () => {
    const newTokenObject = await refreshAccessToken(client_id, client_secret, refresh_token)
    accessToken = newTokenObject.access_token
  }, 3500)
}

console.log(accessToken)

setTimeout(() => console.log(accessToken), 4000)