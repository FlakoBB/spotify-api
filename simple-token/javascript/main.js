// ? Prueba 1
// * Obtencion de Access Token
// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   body: 'grant_type=client_credentials&client_id=MY_CLIENT_ID&client_secret=MY_CLIENT_SECRET'
// }

// fetch('https://accounts.spotify.com/api/token', options)
//   .then(res => res.json())
//   .then(data => {
//     const ACCESS_TOKEN = data.access_token
//     const optionsToken = {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${ACCESS_TOKEN}`
//       }
//     }
       // * Datos de artista
//     fetch('https://api.spotify.com/v1/artists/07XSN3sPlIlB2L2XNcTwJw', optionsToken)
//     .then(res => res.json())
//     .then(artist => console.log(artist))
       // * Datos Album
//     fetch('https://api.spotify.com/v1/albums/4FA68GsblSfvKZZRfM1tI1', optionsToken)
//     .then(res => res.json())
//     .then(album => console.log(album))
//   })
//   .catch(error => console.log(error))

// ? Prueba 2
const fetchSpotifyData = async (url, options) => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`La respuesta de la red no fue correcta: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.log(`Error: ${error}`)
    return null
  }
}

const main = async () => {
  const tokenOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=MY_CLIENT_ID&client_secret=MY_CLIENT_SECRET'
  }

  const tokenData = await fetchSpotifyData('https://accounts.spotify.com/api/token', tokenOptions)

  if (tokenData) {
    const accessToken = tokenData.access_token

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }

    const artistData = await fetchSpotifyData('https://api.spotify.com/v1/artists/07XSN3sPlIlB2L2XNcTwJw', requestOptions)
    console.dir(artistData)
    document.getElementById('artistName').textContent = artistData.name
    document.getElementById('artistImage').src = artistData.images[1].url
    document.getElementById('artistFollowers').textContent = `Seguidores: ${artistData.followers.total}`


    const albumData = await fetchSpotifyData('https://api.spotify.com/v1/albums/4FA68GsblSfvKZZRfM1tI1', requestOptions)
    console.dir(albumData)
    document.getElementById('albumTitle').textContent = albumData.name
    document.getElementById('albumImage').src = albumData.images[1].url
    document.getElementById('totalTraks').textContent = `${albumData.total_tracks} canciones`
    document.getElementById('albumRelease').textContent = `Fecha de lanzamiento: ${albumData.release_date}`
  }
}

main()