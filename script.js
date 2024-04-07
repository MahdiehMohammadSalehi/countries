"use strict";
const container = document.querySelector(".container");

const renderCountryData = function (data, className = "") {
  const lang = Object.values(data.languages);
  const money = Object.values(data.currencies);

  const html = ` <div class="countries ${className}">   
  <img  src=${data.flags.png} alt="" />
  <ul>
    <li class="name"> ${data.name["common"]}</li>
    <li class="region">${data.region}</li>
    </ul>
    <ul>
    <li class="population">🧑‍🤝‍🧑 ${(+data.population / 1000000).toFixed(
      1
    )}M people</li>
    <li class="lang">🗣️ ${lang}</li>
    <li class="corrency">💰 ${money[0].name}</li>
  </ul>
</div>`;
  container.insertAdjacentHTML("beforeend", html);
};

// const countries = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     let data = JSON.parse(this.responseText);
//     data = data[0];
//     renderCountryData(data);
//   });
// };

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountryData(data[0]);
      const neighbours = data[0].borders?.[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbours}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountryData(data[0], "neighbour"));
};

getCountryData("canada");
// getCountryData("portugal");
// getCountryData("usa");
// getCountryData("korea");
// getCountryData("Algeria");
