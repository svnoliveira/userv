import { categories } from "../data/categories.js";
import { partnerList } from "../data/partners.js";
import { brazilianStates } from "../data/states.js";
import { formatPhoneNumber, formatPrice, getCategoryImageInfo } from "./render.js";
import { getCitiesFromUF } from "./usuario/requests.js";

export const renderIndexCategories = () => {
  const listContainer = document.querySelector(".index__text__filter >ul");

  categories.map((category) => {
    const newCategory = document.createElement("li");
    const image = document.createElement("img");
    const name = document.createElement("span");

    image.src = category.src.slice(1);
    image.alt = category.alt;
    name.innerText = category.name;

    newCategory.append(image, name);
    listContainer.appendChild(newCategory);
  });
};

export const renderModal = (partner) => {
  const modal = document.querySelector("#modal__controller");
  const name = document.querySelector(".modal__header > h2");
  const xButton = document.querySelector(".modal__header > button");
  const image = document.querySelector(".modal__info > img");
  const phone = document.querySelector(".modal__info .phone");
  const email = document.querySelector(".modal__info .email");
  const address = document.querySelector(".modal__info .address");
  const price = document.querySelector(".modal__services > .price");
  const serviceList = document.querySelector(".modal__services ul");

  name.innerText = partner.fantasyName;
  image.src = partner.image;
  phone.innerText = formatPhoneNumber(partner.phone);
  email.innerText = partner.email;
  address.innerText = `${partner.address.city}, ${partner.address.uf}`;
  price.innerText = `Preços à partir de ${formatPrice(partner.startingPrice)}`;

  while (serviceList.firstChild) {
    serviceList.removeChild(serviceList.firstChild);
  }

  partner.services.map((service) => {
    const newService = document.createElement("li");
    newService.classList.add("font-p-normal");
    newService.innerText = service.entry;
    serviceList.append(newService);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
      event.stopPropagation();
    }
  });

  xButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.close();
  });
};

export const renderPartnerList = () => {
  //filter by city
  const userCity = localStorage.getItem("@userv: city") || "";
  const location = document.getElementById("usuario__search__location");

  let filteredList = partnerList; //usando dados mockados, adicionar integração a API

  if (userCity.length > 0) {
    location.innerText = userCity;
    filteredList = filteredList.filter(
      (partner) => partner.address.city === userCity
    );
  }

  //filter by category
  const categoryList = document.querySelectorAll(".category--selected span");
  if (categoryList.length > 0) {
    let newList = [];
    categoryList.forEach((category) => {
      filteredList.map((partner) => {
        if (category.innerText === partner.category) {
          newList.push(partner);
        }
      });
    });
    filteredList = newList;
  }

  //filter by price
  const rangePrice = document.querySelectorAll(".range-price input");
  const minPrice = rangePrice[0].value;
  const maxPrice = rangePrice[1].value;
  const filter = document.querySelector(".usuario__filter");

  if (!filter.classList.contains("hidden")) {
    filteredList = filteredList.filter(
      (partner) =>
        partner.startingPrice >= minPrice && partner.startingPrice <= maxPrice
    );
  }

  //filter by input
  const input = document.querySelector("#usuario__search__box input");
  if (input.value.length > 0) {
    filteredList = filteredList.filter((partner) =>
      partner.fantasyName.toLowerCase().includes(input.value.toLowerCase())
    );
  }

  //sort functions
  const sortOption = document.querySelector(".sort--selected").innerText;
  if (sortOption === "Preço") {
    filteredList.sort((a, b) => a.startingPrice - b.startingPrice);
  } else {
    filteredList.sort((a, b) => a.fantasyName.localeCompare(b.fantasyName));
  }

  const listContainer = document.querySelector(".usuario__search__list");

  //clear the list
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  //render filtered list
  if (filteredList.length < 1) {
    const card = document.createElement("li");
    const message = document.createElement("p");

    message.classList.add("font-p-normal--solid", "parceiro__card__empty");
    message.innerText = "Nenhum parceiro encontrado.";
    card.appendChild(message);
    listContainer.appendChild(card);
    return;
  } else {
    filteredList.map((partner) => {
      const card = document.createElement("li");
      const image = document.createElement("img");
      const textBox = document.createElement("div");
      const name = document.createElement("h3");
      const priceContainer = document.createElement("div");
      const price = document.createElement("span");
      const categoryContainer = document.createElement("div");
      const categoryImg = document.createElement("img");
      const categoryName = document.createElement("span");

      card.classList.add("parceiro__card");
      image.src = partner.image;
      image.alt = `Logo ou imagem da empresa ${partner.fantasyName}`;
      textBox.classList.add("parceiro__card__text-box");

      name.innerText = partner.fantasyName;
      priceContainer.classList.add("parceiro__card__price");
      price.classList.add("font-small--blue");
      price.innerText = formatPrice(partner.startingPrice);
      categoryContainer.classList.add("parceiro__card__category");
      categoryImg.src = getCategoryImageInfo("src", partner.category);
      categoryImg.alt = getCategoryImageInfo("alt", partner.category);
      categoryName.innerText = partner.category;

      listContainer.appendChild(card);
      card.append(image, textBox, categoryContainer);
      textBox.append(name, priceContainer);
      priceContainer.append(price);
      categoryContainer.append(categoryImg, categoryName);

      card.addEventListener("click", (event) => {
        event.preventDefault();
        const modal = document.querySelector("#modal__controller");
        renderModal(partner);
        modal.showModal();
      });
    });
  }
  return;
};

const renderCityList = (list) => {
  const container = document.querySelector(".search");
  const input = document.querySelector(".dropdown input");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  list.map((city) => {
    const cityElement = document.createElement("p");
    cityElement.classList.add("font-p-normal");
    cityElement.innerText = city.nome;
    container.appendChild(cityElement);
    cityElement.addEventListener("click", (event) => {
      event.preventDefault();
      container.classList.remove("show");
      localStorage.setItem("@userv: city", `${city.nome}`);
      input.value = city.nome;
      renderPartnerList();
    });
  });
};

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
  const filterButton = document.querySelector(".range > button");

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

  filterButton.addEventListener("click", (event) => {
    renderPartnerList();
    event.preventDefault();
  });
};

export const handleCategoryFilters = () => {
  const categoryList = document.querySelectorAll(".index__text__filter >ul li");

  categoryList.forEach((category) => {
    category.addEventListener("click", (event) => {
      event.preventDefault();
      category.classList.toggle("category--selected");
      renderPartnerList();
    });
  });
};

export const handleSearchButtons = () => {
  const clearButton = document.getElementById("clear-button");
  const location = document.getElementById("usuario__search__location");
  const sortButtons = document.querySelectorAll(
    "#usuario__search__sort button"
  );
  const alphabetical = sortButtons[0];
  const price = sortButtons[1];
  const input = document.querySelector("#usuario__search__box input");
  const searchButton = document.querySelector("#usuario__search__box button");

  clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("@userv: city");
    location.innerText = "Todo Brasil";
    input.value = "";
    renderPartnerList();
  });

  sortButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (!button.classList.contains("sort--selected")) {
        alphabetical.classList.toggle("sort--selected");
        price.classList.toggle("sort--selected");
        renderPartnerList();
      }
    });
  });

  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderPartnerList();
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      renderPartnerList();
    }
  });
};

export const handleFilterDisplay = () => {
  const filter = document.querySelector(".usuario__filter");
  const input = document.querySelector("#usuario__search__box input");
  const xButton = document.querySelector(".filter__header span");
  const filterButton = document.querySelector("#usuario__search__box > img");

  input.addEventListener("click", (event) => {
    filter.classList.contains("hidden") && filter.classList.remove("hidden");
  });

  xButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    filter.classList.add("hidden");
  });

  filterButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    filter.classList.toggle("hidden");
  });
};
