import { brazilianStates } from "../../data/states.js";
import { renderCityList } from "../render.js";
import { getCitiesFromUF } from "./requests.js";

export const handleUFSelector = () => {
  const dropdownButton = document.querySelector(".dropbtn");
  const container = document.querySelector(".uf");
  const input = document.querySelector("header input");
  const cityData = document.getElementById("cityData");
  const cityContainer = document.querySelector(".search");

  brazilianStates.map((uf) => {
    const state = document.createElement("p");
    state.innerText = uf;
    state.classList.add(["font-p-normal"]);
    state.addEventListener("click", async (event) => {
      event.preventDefault();
      container.classList.toggle("show");
      dropdownButton.innerText = "Carregando...";
      renderCityList([]);
      const cityList = await getCitiesFromUF(uf);
      cityData.textContent = JSON.stringify(cityList);
      dropdownButton.innerText = uf;
      input.disabled = false;
      input.value = "";
      input.placeholder = "Digite o Nome da Cidade";
    });
    container.appendChild(state);
  });

  dropdownButton.addEventListener("click", (event) => {
    event.preventDefault();
    container.classList.toggle("show");
    input.disabled = true;
    input.placeholder = "Selecione uma localização";
    dropdownButton.innerText = "Selecione...";
  });

  input.addEventListener("click", (event) => {
    event.preventDefault();
    cityContainer.classList.toggle("show");
  });

  input.addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    const cityList = JSON.parse(cityData.textContent);
    if (searchTerm.length >= 3 && cityList) {
      const filteredList = cityList.filter((city) => {
        return city.nome.toLowerCase().startsWith(searchTerm.toLowerCase());
      });
      if (!cityContainer.classList.contains("show")) {
        cityContainer.classList.add("show");
      }
      renderCityList(filteredList);
    } else {
      renderCityList([]);
    }
  });
};

export const handlePriceRange = () => {
  let rangeMin = 100;
  const range = document.querySelector(".range-selected");
  const rangeInput = document.querySelectorAll(".range-input input");
  const rangePrice = document.querySelectorAll(".range-price input");

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minRange = parseInt(rangeInput[0].value);
      let maxRange = parseInt(rangeInput[1].value);
      if (maxRange - minRange < rangeMin) {
        if (e.target.className === "min") {
          rangeInput[0].value = maxRange - rangeMin;
        } else {
          rangeInput[1].value = minRange + rangeMin;
        }
      } else {
        rangePrice[0].value = minRange;
        rangePrice[1].value = maxRange;
        range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
      }
    });
  });

  rangePrice.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = rangePrice[0].value;
      let maxPrice = rangePrice[1].value;
      if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });
};

export const handleCategoryFilters = () => {
  const categoryList = document.querySelectorAll("aside > ul > li");

  categoryList.forEach((category) => {
    category.addEventListener("click", (event) => {
      event.preventDefault();
      category.classList.toggle("category--selected");
    });
  });
};
