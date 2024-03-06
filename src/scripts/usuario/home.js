import { brazilianStates } from "../../data/states.js";
import { handleUsuarioHeader, renderCityList, userRouteProtection } from "../render.js";
import { getCitiesFromUF } from "./requests.js";

userRouteProtection("closed");
handleUsuarioHeader();

const handleUFSelector = () => {
    const dropdownButton = document.querySelector('.dropbtn');
    const container = document.querySelector('.uf');
    const input = document.querySelector('header input');
    const cityData = document.getElementById('cityData');
    const cityContainer = document.querySelector('.search');

    brazilianStates.map((uf) => {
        const state = document.createElement('p')
        state.innerText = uf;
        state.classList.add(['font-p-normal'])
        state.addEventListener('click', async (event) => {
            event.preventDefault();
            container.classList.toggle('show');
            dropdownButton.innerText = 'Carregando...';
            renderCityList([]);
            const cityList = await getCitiesFromUF(uf);
            cityData.textContent = JSON.stringify(cityList);
            dropdownButton.innerText = uf;
            input.disabled = false;
            input.value = '';
            input.placeholder = 'Digite o Nome da Cidade';
        })
        container.appendChild(state);
    });

    dropdownButton.addEventListener('click', (event) => {
        event.preventDefault();
        container.classList.toggle('show');
        input.disabled = true;
        input.placeholder = 'Selecione uma localização';
        dropdownButton.innerText = 'Selecione...'
    });

    input.addEventListener('click', (event) => {
        event.preventDefault();
        cityContainer.classList.toggle('show');
    });

    input.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        const cityList = JSON.parse(cityData.textContent);
        if (searchTerm.length >= 3 && cityList) {
            const filteredList = cityList.filter((city) => {
                return city.nome.toLowerCase().startsWith(searchTerm.toLowerCase());
            });
            if (!cityContainer.classList.contains('show')){
                cityContainer.classList.add('show');
            };
            renderCityList(filteredList);
        } else {
            renderCityList([]);
        }
    });

};

handleUFSelector();