"use strict";
const container = document.querySelector(".container");

const countries = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    let data = JSON.parse(this.responseText);
    data = data[0];
    const lang = Object.values(data.languages);
    const money = Object.values(data.currencies);

    console.log(data);
    const html = ` <div class="countries">   
  <img  src=${data.flags.png} alt="" />
  <ul>
    <li class="name"> ${data.altSpellings[1]}</li>
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
  });
};

countries("iran");
countries("usa");
countries("korea");
countries("Algeria");
