import fetchData from './fetching.js'

const requestAccessToken = async (client_id, client_secret, code, uri) => {
  const bodyParameters = new URLSearchParams()
  bodyParameters.append('grant_type', 'authorization_code')
  bodyParameters.append('code', code)
  bodyParameters.append('redirect_uri', uri)

  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`
    },
    body: bodyParameters
  }

  const tokenData = await fetchData('https://accounts.spotify.com/api/token', options)

  if (tokenData) {
    return tokenData
  } else {
    console.log('Sin Token')
    return null
  }
}

export default requestAccessToken