$(document).ready(function () {
  var searchButton = $("#search-button");
  var cityInput = $("#search-input");
  var citiesButtons = $("#history");

  // Initialize Local Storage and Retrieve Cities from Local Storage
  function initLS() {
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
  function saveCity() {
    var city = cityInput.val();
    cityfromLS = initLS(city);

    // Validation of city field
    if (city !== "") {
      cityfromLS.push(city);
      localStorage.setItem("city", JSON.stringify(cityfromLS));
    }
  }

  // Display Cities from Local Storage
  function renderCities() {
    cityfromLS = JSON.parse(localStorage.getItem("city")) || [];

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
    });
  }

  renderCities();

  // Attach the saveCity function to the Click Event
  searchButton.on("click", saveCity);
});
