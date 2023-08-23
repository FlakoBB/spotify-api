const clientId = 'MY_CLIENT_ID'
const params = new URLSearchParams(window.location.search)
const code = params.get('code')

// * generador de codigo random
const generateCodeVerifier = (length) => {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

// * Generador de Codigo de Desafio
const generateCodeChallenge = async (codeVerifier) => {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

// * Funcion para obtener el codigo de autorizacion
const redirectToAuthCodeFlow = async (clientId) => {
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)

  localStorage.setItem('verifier', verifier)

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('response_type', 'code')
  params.append('redirect_uri', 'http://localhost:5500')
  params.append('scope', 'user-read-private user-read-email')
  params.append('code_challenge_method', 'S256')
  params.append('code_challenge', challenge)

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}

// * Obtencion del Token de Acceso
const getAccessToken = async (clientId, code) => {
  const verifier = localStorage.getItem('verifier')

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', 'http://localhost:5500')
  params.append('code_verifier', verifier)

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  })

  const { access_token } = await result.json()
  return access_token
}

// * Obtencion de Datos
const fetchProfile = async (token) => {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await result.json()
}

const populateUI = (profile) => {
  document.getElementById('displayName').innerText = profile.display_name
  if (profile.images[0]) {
    const profileImage = new Image(200, 200)
    profileImage.src = profile.images[0].url
    document.getElementById('avatar').appendChild(profileImage)
    document.getElementById('imgUrl').innerText = profile.images[0].url
  }
  document.getElementById('id').innerText = profile.id;
  document.getElementById('email').innerText = profile.email;
  const uri = document.getElementById('uri')
  uri.innerText = profile.uri;
  uri.setAttribute('href', profile.external_urls.spotify);
  const url = document.getElementById('url')
  url.innerText = profile.href;
  url.setAttribute('href', profile.href);
}

if (!code) {
  redirectToAuthCodeFlow(clientId)
} else {
  const accessToken = await getAccessToken(clientId, code)
  const profile = await fetchProfile(accessToken)
  populateUI(profile)
}
