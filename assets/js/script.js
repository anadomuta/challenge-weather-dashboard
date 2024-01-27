$(document).ready(function () {
  var searchButton = $("#search-button");
  var cityInput = $("#search-input");

  // Initialize Local Storage and Retrieve Cities from Local Storage
  function initLS(city) {
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

  // Attach the saveCity function to the Click Event
  searchButton.on("click", saveCity);
});
