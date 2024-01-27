$(document).ready(function () {
  var searchButton = $("#search-button");
  var cityInput = $("#search-input");
  var ul = $("<ul>");

  $("#history").append(ul);

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

    cityfromLS.push(city);
    localStorage.setItem("city", JSON.stringify(cityfromLS));
  }

  // Display Cities from Local Storage
  function renderCities() {
    cityfromLS = JSON.parse(localStorage.getItem("city")) || [];

    cityfromLS.forEach((city) => {
      var listCity = $("<li>");
      listCity.text(city);
      ul.append(listCity);
    });
  }

  renderCities();

  // Attach the saveCity function to the Click Event
  searchButton.on("click", saveCity);
});
