const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`La respuesta de la red no fue la esperada: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.log(error)
    return null
  }
}

export default fetchData