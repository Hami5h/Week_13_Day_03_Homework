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
