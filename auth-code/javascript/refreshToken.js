import fetchData from './fetching.js'

const refreshAccessToken = async (client_id, client_secret, refresh_token) => {
  const bodyParameters = new URLSearchParams()
  bodyParameters.append('grant_type', 'refresh_token')
  bodyParameters.append('refresh_token', refresh_token)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`
    },
    body: bodyParameters
  }

  const newTokenData = await fetchData('https://accounts.spotify.com/api/token', options)

  if (newTokenData) {
    return newTokenData
  } else {
    console.log('Error de nuevo token')
    return null
  }
}

export default refreshAccessToken