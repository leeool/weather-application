// Get API Data

const baseUrl = "http://dataservice.accuweather.com/"
const APIKey = "PMCOlrg4zAAlGcHOeIXqUfL1JYFtbE2m"

const getCityUrl = (cityName) => {
  return `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`
}
const getWeatherUrl = (key) => {
  return `${baseUrl}currentconditions/v1/${key}?apikey=${APIKey}&language=pt-br`
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Não foi possivel obter os dados da API11")
    }

    return response.json()
  } catch ({ name, message }) {
    alert(`${name}: ${message} `)
  }
}

const getCityData = (cityName) => fetchData(getCityUrl(cityName))

const getCityWeather = (cityKey) =>  fetchData(getWeatherUrl(cityKey))

