// manipulate DOM

const form = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer 
  = document.querySelector('[data-js="city-temperature"]')
const card = document.querySelector('[data-js="card"]')
const cardImg = document.querySelector('[data-js="time"]')
const cardIcon = document.querySelector('[data-js="time-icon"] img')

const showCityWeatherInfo = async (inputValue) => {
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key)
  const { Value } = Temperature.Metric
  let turn = ""

  IsDayTime ? turn = "day" : turn = "night"
  cardImg.src = `./src/${turn}.svg`
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Value
  card.classList.remove("d-none")
  cardIcon.src = `./src/icons/${WeatherIcon}.svg`
}

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  const inputValue = form.city.value

  showCityWeatherInfo(inputValue)
  localStorage.setItem("city", inputValue)
  form.reset()
})

const showLocalStorageCity = () => {
  const lastCity = localStorage.getItem("city")
  
  if (lastCity){
    showCityWeatherInfo(lastCity)
  }
}

showLocalStorageCity()
