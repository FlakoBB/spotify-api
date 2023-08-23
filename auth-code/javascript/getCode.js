import idGenerator from './genertor.js'

const getCode = (client_id, uri) => {
  const authURL = 'https://accounts.spotify.com/authorize'
  const stateValue = idGenerator(16)
  const scope = 'user-read-private user-read-email'
  const show_dialog = 'true'

  const params = new URLSearchParams()
  params.append('client_id', client_id)
  params.append('response_type', 'code')
  params.append('redirect_uri', uri)
  params.append('state', stateValue)
  params.append('scope', scope)
  params.append('show_dialog', show_dialog)

  const paramsString = params.toString()
  
  window.location = `${authURL}?${paramsString}`
}

export default getCode