"use strict"

document.querySelector("button").addEventListener("click", () => {
   const input = document.querySelector("#input"),
      container = document.querySelector(".container"),
      weatherItem = document.querySelector(".weather-item"),
      weatherDetails = document.querySelector(".weather-details"),
      error404 = document.querySelector(".error-404"),
      image = document.querySelector('.weather-item img'),
      temperature = document.querySelector('.temperature'),
      description = document.querySelector('.description'),
      humidity = document.querySelector('.humidity span'),
      wind = document.querySelector('.wind span')
   // Проверка input
   function validation(input) {
      let result = true, reg = new RegExp("^[a-zA-Z'][a-zA-Z']+[a-zA-Z]?$")
      if (!reg.test(input.value)) {
         alert("The field must contain only English letters")
         createError()
         return result = false
      }
      return result
   }
   if (validation(input)) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=08fe83ee05a40d996d9ba1902799c2df`)
         .then(resp => { return resp.json() })
         .then(data => {
            // Проверка ошибки 404
            if (data.cod == "404") {
               createError()
               return;
            }
            error404.style.display = 'none'
            error404.classList.remove('open')
            // Отображение img погоды
            switch (data.weather[0].main) {
               case "Clouds":
                  image.src = "https://i.ibb.co/HCVZzkc/cloud.png"
                  break
               case "Rain":
                  image.src = "https://i.ibb.co/Tq5brh6/rain.png"
                  break
               case "Clear":
                  image.src = "https://i.ibb.co/CHJKTGX/clear.png"
                  break
               case "Snow":
                  image.src = "https://i.ibb.co/Tq5brh6/rain.png"
                  break
               case "Haze":
                  image.src = "https://i.ibb.co/b5LvSrP/mist.png"
                  break
               default:
                  image.src = ''
            }
            showWeather(data)
            openWeatherInfo()
         })
   }
   // Создает ошибку
   function createError() {
      container.style.height = '400px'
      weatherItem.style.display = 'none'
      weatherDetails.style.display = 'none'
      error404.style.display = 'block'
      error404.classList.add('open')
   }
   // Показывает информацию о погоде
   function showWeather(data) {
      temperature.innerHTML = `${Math.round(data.main.temp) - 273}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${Math.round(data.wind.speed)}Km/h`;
   }
   //Открывает информационное окно
   function openWeatherInfo() {
      weatherItem.style.display = '';
      weatherDetails.style.display = '';
      weatherItem.classList.add('open');
      weatherDetails.classList.add('open');
      container.style.height = '590px';
   }
})


