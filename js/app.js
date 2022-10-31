// manipulate DOM

const form = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer 
  = document.querySelector('[data-js="city-temperature"]')
const card = document.querySelector('[data-js="card"]')
const cardImg = document.querySelector('[data-js="time"]')
const cardIcon = document.querySelector('[data-js="time-icon"] img')

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  const inputValue = form.city.value
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ WeatherText, 
    Temperature, 
    IsDayTime, 
    WeatherIcon }] = await getCityWeather(Key)

  const { Value } = Temperature.Metric

  console.log(Key, LocalizedName)
  console.log(WeatherText, Value)

  insertInfoIntoDOM(LocalizedName, WeatherText, Value, IsDayTime, WeatherIcon)

  form.reset()
})

const insertInfoIntoDOM = (
  cityName,
  weatherName,
  temperatureValue,
  IsDayTime,
  WeatherIcon
) => {
  let hour = ""
  cityNameContainer.textContent = cityName
  cityWeatherContainer.textContent = weatherName
  cityTemperatureContainer.textContent = temperatureValue
  card.classList.remove("d-none")

  IsDayTime ? (hour = "day") : (hour = "night")
  cardImg.src = `./src/${hour}.svg`

  cardIcon.src = `./src/icons/${WeatherIcon}.svg`
}
