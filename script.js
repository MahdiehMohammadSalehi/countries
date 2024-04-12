"use strict";
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

const container = document.querySelector(".container");
const btn = document.querySelector(".btn");

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

const handleError = function (err) {
  container.insertAdjacentText(
    "beforeend",
    `something went wrong. 💣${err.message}`
  );
};

const getJSON = function (url, msg) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${msg}, (${response.status})`);
    return response.json();
  });
};
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "country not found")
    .then((data) => {
      renderCountryData(data[0]);
      const neighbours = data[0].borders?.[0];
      if (!neighbours) throw new Error("no neighbours found!");
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbours}`,
        "country not found"
      );
    })
    .then((data) => renderCountryData(data[0], "neighbour"))
    .catch((err) => handleError(err));
};

btn.addEventListener("click", getCountryData.bind(this, "iran"));
