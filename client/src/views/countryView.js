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
// CountryView.prototype.render = function(country){
//     const ul = document.querySelector('#countries');
//     while(ul.firstChild) {
//       ul.removeChild(ul.firstChild);
//     }
//     const liName = document.createElement('li');
//     const licapital = document.createElement('li');
//     const imageLi = document.createElement('li');
//     const liFlag = document.createElement('img')
//     liName.innerText = country.name;
//     licapital.innerText = country.capital;
//     liFlag.src = country.flag;
//     imageLi.appendChild(liFlag);
//     ul.appendChild(liName);
//     ul.appendChild(licapital);
//     ul.appendChild(imageLi);
// }

CountryView.prototype.render = function(country){
  const countryInfo = document.getElementById('countries');
  while(countryInfo.firstChild) {
    countryInfo.removeChild(countryInfo.firstChild);
  }
  const name = createName(country);
  const capital = createCapital(country);
  const region = createRegion(country);
  const subRegion = createSubRegion(country);
  const flag = createFlag(country);
  appendElements(countryInfo, name, capital, region, subRegion, flag);
}

const createName = function(country) {
  const name = document.createElement('li');
  name.innerText = 'Name: ' + country.name;
  return name;
}

const createCapital = function(country) {
  const capital = document.createElement('li');
  capital.innerText = 'Capital: ' + country.capital;
  return capital;
}

const createRegion = function(country) {
  const region = document.createElement('li');
  region.innerText = 'Region: ' + country.region;
  return region;
}

const createSubRegion = function(country) {
  const subRegion = document.createElement('li');
  subRegion.innerText = 'Sub Region: ' + country.subregion;
  return subRegion;
}

const createFlag = function(country) {
  const flag = document.createElement('p')
  const image = document.createElement('img')
  image.src = country.flag;
  flag.appendChild(image);
  return flag;
}

const appendElements = function(countryInfo, name, capital, region, subregion, flag) {
  countryInfo.appendChild(name);
  countryInfo.appendChild(capital);
  countryInfo.appendChild(region);
  countryInfo.appendChild(subregion);
  countryInfo.appendChild(flag);
}

 module.exports = CountryView;
