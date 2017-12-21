let countries = [];
const Request = require('./services/request.js');
const CountryView = require('./views/countryView');
const MapWrapper = require('./models/mapWrapper.js');

const request = new Request("http://localhost:3000/api/countries")
const countryView = new CountryView();


var app = function(){
const url = "https://restcountries.eu/rest/v2/all";
makeRequest(url, requestComplete);

const saveCountryButton = document.querySelector('#save-country');
saveCountryButton.addEventListener('click', saveCountryButtonClicked)


const removeCountryButton = document.querySelector('#remove-country');
removeCountryButton.addEventListener('click', removeCountryButtonClicked)

}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
};

const requestComplete = function() {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  const select = document.querySelector('#all-countries-list');
  select.addEventListener('change', function(){
    let selectedCountry = countries[this.value];
  })
  populateDropDown(countries);
}

const populateDropDown = function(country) {
  const dropDown = document.querySelector('#all-countries-list');
  country.forEach(function(country, index) {
    const option = document.createElement('option');
    option.value = index;
    option.innerText = country.name;
    dropDown.appendChild(option);
  });
}

const saveCountryButtonClicked = function(evt) {
  const countryIndex = document.querySelector('#all-countries-list').value;
  const selectedCountry = countries[countryIndex];
  const latlng = {lat: selectedCountry.latlng[0], lng: selectedCountry.latlng[1]};
  const center = latlng
    const container = document.querySelector('#main-map');
    const mainMap = new MapWrapper(container, center, 5);
    mainMap.addClickEvent();
    mainMap.addMarker(center, "This is" + " " + selectedCountry.name);

  request.post(saveCountryRequestComplete, selectedCountry);
}

const saveCountryRequestComplete = function(name) {
  countryView.addCountry(name);
}

const removeCountryButtonClicked = function(evt) {
  console.log('remove button clicked');
  request.delete(deleteRequestComplete);
}

const deleteRequestComplete = function(){
  countryView.clear();
}


document.addEventListener('DOMContentLoaded', app);
