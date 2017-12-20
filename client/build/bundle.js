/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let countries = [];
const Request = __webpack_require__(1);
const CountryView = __webpack_require__(2);
const MapWrapper = __webpack_require__(3);

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
    mainMap.addMarker(center, "This is " + selectedCountry.name);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}
//making this pretty generic, si it can be re-usable
Request.prototype.get = function(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function(){
    if(this.status != 200) {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
//responseBody will be allQuotes, this is dynamic - the callback can we
//whatever you want it to be, single responsibilty obeyed
    callback(responseBody);
  });
  //need to send it in here - at the very end of the function
  request.send();
}

Request.prototype.post = function(callback, body) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);
  //sometimes we need to tell the server what we're giving it in a header, where
  //the additional info lives/ insomnia did it all for us
  //now we need to add a header in js
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function(){
    if(this.status != 201) {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  //we need to pass the body but stringified, so another funciton doesn't
  //need to worry about it, it's ready to go
  request.send(JSON.stringify(body));
}

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function() {
    if(this.status!==204) {
      return;
    }
    callback();
  });
  request.send();
}

module.exports = Request;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var CountryView = function(){
  this.countries = [];
}
//everytime you add a country it adds it to the array and displays it
CountryView.prototype.addCountry = function(country) {
  this.countries.push(country);
  this.render(country);
}

CountryView.prototype.clear = function(country) {
  this.countries = [];
  const ul = document.querySelector('#countries');
  ul.innerHTML = '';
}
//all the appending in this one
CountryView.prototype.render = function(country){
    const ul = document.querySelector('#countries');
    while(ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    const liName = document.createElement('li');
    const licapital = document.createElement('li');
    const imageLi = document.createElement('li');
    const liFlag = document.createElement('img')
    liName.innerText = country.name;
    licapital.innerText = country.capital;
    liFlag.src = country.flag;
    imageLi.appendChild(liFlag);
    ul.appendChild(liName);
    ul.appendChild(licapital);
    ul.appendChild(imageLi);
}

 module.exports = CountryView;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const MapWrapper = function(container, coords, zoom) {

  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });

  this.markers = [];
}

MapWrapper.prototype.addClickEvent = function() {
  google.maps.event.addListener(this.googleMap, 'click', function(event) {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    this.addMarker(position, "You selected this location");
  }.bind(this));
}

MapWrapper.prototype.addMarker = function(coords, message) {
  const infoWindowLocation = new google.maps.InfoWindow({
    content: message + ' ' + `${coords.lat}, ${coords.lng}`
  });
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    infoWindow: infoWindowLocation
  });
  google.maps.event.addListener(marker, 'click', function() {
    this.infoWindow.open(this.googleMap, this);
  });
  this.markers.push(marker);
}

MapWrapper.prototype.removeMarkers = function() {
  this.markers.forEach(function(marker){
    marker.setMap(null);
  })
  this.markers = [];
}

MapWrapper.prototype.toSelectedCountry = function() {
  const country = {
    lat: 41.854073,
    lng: -87.619392,
  }
  this.googleMap.setCenter(country);
  this.addMarker(country, "This is Chicago");
  this.googleMap.setZoom(16);
}

MapWrapper.prototype.whereAmI = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    const location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    this.googleMap.setCenter(location);
    this.addMarker(location, 'This is your current location');
  }.bind(this))
}

module.exports = MapWrapper;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map