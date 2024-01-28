$(document).ready(function () {
  var searchButton = $("#search-button");
  var cityInput = $("#search-input");
  var citiesButtons = $("#history");
  var APIKey = "8fa17f3bf5819b35e5514a16ea6de259";
  var weatherToday = $("#today");
  var weatherForecast = $("#forecast");
  var currentDate = dayjs().format("DD/MM/YYYY");

  // Initialize Local Storage and Retrieve Cities from Local Storage
  function updateLS() {
    var cityfromLS = localStorage.getItem("city");
    if (cityfromLS === null || cityfromLS === undefined) {
      cityfromLS = [];
      localStorage.setItem("city", JSON.stringify(cityfromLS));
    } else {
      cityfromLS = JSON.parse(cityfromLS);
    }
    return cityfromLS;
  }

  // Save City upon Button Click
  function getWeather(event, city) {
    event.preventDefault();

    var cityfromLS = updateLS(city);

    // Validation of city field
    var isCityInHistory = cityfromLS.includes(city);

    if (city !== "" && !isCityInHistory) {
      cityfromLS.push(city);
      localStorage.setItem("city", JSON.stringify(cityfromLS));
      renderCities();
    }

    fetchCurrentWeather(city);
  }

  function fetchCurrentWeather(city) {
    // Building the query URL to get current temperature in Celsius
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city.trim() +
      "&units=metric" +
      "&appid=" +
      APIKey;

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        renderForecast(data.coord.lat, data.coord.lon);

        // Display current weather conditions for selected city
        weatherToday.removeClass("d-none");
        var weatherTodayIcon = data.weather[0].icon;
        var todayIcon = `<img src="https://openweathermap.org/img/wn/${weatherTodayIcon}@2x.png"/>`;
        weatherToday.append(todayIcon);
        weatherToday.html(
          "<h3> " + city + " (" + currentDate + ")" + todayIcon
        );

        //Temperature
        var tempCelsius = $("<p>");
        var tempInCelsius = data.main.temp;
        tempCelsius.text("Temp: " + tempInCelsius.toFixed(2) + "°C");

        // Wind conditions
        var wind = $("<p>");
        var windInKPH = data.wind.speed * 3.6;
        wind.text("Wind: " + windInKPH.toFixed(2) + " KPH");

        // Humidity conditions
        var humidity = $("<p>").text("Humidity: " + data.main.humidity + "%");

        // Append to the HTML container
        weatherToday.append(tempCelsius, wind, humidity);
      });
  }

  // Display Cities from Local Storage
  function renderCities() {
    citiesButtons.empty();
    var cityfromLS = JSON.parse(localStorage.getItem("city")) || [];

    // Iterate through local storage and render buttons for cities
    cityfromLS.forEach((city) => {
      var newCityButton = $("<button>");
      newCityButton
        .text(city)
        .attr(
          "style",
          "background-color: lightgrey; padding:10px; border: none; border-radius: 5px"
        )
        .addClass("new-city-btn");
      citiesButtons.append(newCityButton);
      newCityButton.on("click", function (event) {
        var cityName = $(event.currentTarget).text();

        getWeather(event, cityName);
      });
    });
  }

  renderCities();

  // Display 5 day forecast for selected city
  function renderForecast(lat, lon) {
    var queryURLForecast =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=metric" +
      "&appid=" +
      APIKey;

    fetch(queryURLForecast)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        weatherForecast.html("<h5>" + "5-Day Forecast: ");

        for (let i = 7; i < data.list.length; i += 7) {
          var forecastItem = data.list[i];
          var forecastCardDate = forecastItem.dt_txt.split(" ")[0];
          var forecastCardIcon = forecastItem.weather[0].icon;
          var forecastCardTemp = forecastItem.main.temp;
          var forecastCardWind = forecastItem.wind.speed;
          var forecastCardHumidity = forecastItem.main.humidity;
          var forecastCard = `<div class="card border border-white" style="width: 20%;">
            <div class="card-body text-white" style="background-color: #2D3E50">
              <h5 class="card-title">${forecastCardDate}</h5>
              <p class="card-text"><img src="https://openweathermap.org/img/wn/${forecastCardIcon}@2x.png"/></p>
              <p class="card-text">Temp: ${forecastCardTemp} °C</p>
              <p class="card-text">Wind: ${forecastCardWind} KPH</p>
              <p class="card-text">Humidity: ${forecastCardHumidity} %</p>
            </div>
          </div>`;
          weatherForecast.append(forecastCard);
        }
      });
  }

  // Attach the function to save the city name, display current weather and 5-day forecast to the Click Event
  searchButton.on("click", function (event) {
    var cityVal = cityInput.val();

    getWeather(event, cityVal);
  });
});
