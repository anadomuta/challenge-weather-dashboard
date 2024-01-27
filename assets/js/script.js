$(document).ready(function () {
  // Initialize Local Storage and Retrieve Cities from Local Storage
  function initLS(city) {
    var cityfromLS = localStorage.getItem(city);
    if (cityfromLS === null || cityfromLS === undefined) {
      cityfromLS = [];
    } else {
      cityfromLS = JSON.parse(cityfromLS);
    }
  }
});
