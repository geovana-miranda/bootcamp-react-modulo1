import { requestCountry, requestAPI } from "./api.js";

const countriesSelect = document.getElementById("country");
const search = document.getElementById("search");
const chartSection = document.querySelector(".chart__section");

chartSection.classList.add("hidden");

document.addEventListener("DOMContentLoaded", async () => {
  const countries = await requestCountry();
  countriesSelect.innerHTML = "";
  countries.forEach((item) => addCountry(item.iso, item.name));
});

function addCountry(iso, name) {
  const option = document.createElement("option");
  option.value = iso;
  option.textContent = name;

  countriesSelect.appendChild(option);
}

search.addEventListener("click", async (e) => {
  e.preventDefault();

  if (window.myChart) window.myChart.destroy();

  const dateSelect = document.getElementById("date").value;
  const countrySelect = document.getElementById("country").value;

  const data = await requestAPI(dateSelect, countrySelect);
  chartSection.classList.remove("hidden");

  criando(data);
});

async function criando(info) {
  window.myChart = new Chart(document.getElementById("graphic"), {
    type: "bar",
    data: {
      labels: [
        "Confirmados",
        "Mortes",
        "Recuperados",
        "Ativos",
      ],
      datasets: [
        {
          label: "Casos",
          data: [info.confirmed, info.deaths, info.recovered, info.active],
          backgroundColor: "#70ca84",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top", 
        },
        title: {
          display: true,
          text: `Dados da Covid-19`,
        },
      },
    },
  });
}

