// general functions

import { categories } from "../data/categories.js";

export const toast = (color, message, element) => {
    const red = '#FF5630';
    const green = '#36B37E';
    let selectedColor = '';
    
    if (color == `red`){
        selectedColor = red
    } else if (color == 'green'){
        selectedColor = green
    }

    const toastContainer = document.createElement(`div`);
    const main = element ? element : document.querySelector('body');
    toastContainer.classList.add(`toast`);
    toastContainer.innerText = message;
    toastContainer.style.backgroundColor = selectedColor;
    main.appendChild(toastContainer);

    setTimeout( function(){ 
        toastContainer.remove();
    }, 3000);
}

export const userRouteProtection = (mode) => {
    const userToken = localStorage.getItem("@uServ: userToken")
    if (mode === "open"){
        if (userToken){
            location.replace('../usuario/home.html');
        }
    } else if (mode === "closed") {
        if (!userToken){
            location.replace('../usuario/login.html');
        }
    }
}

export const partnerRouteProtection = (mode) => {
    const userToken = localStorage.getItem("@uServ: partnerToken");
    if (mode === "open"){
        if (userToken){
            location.replace('../painel/home.html');
        }
    } else if (mode === "closed") {
        if (!userToken){
            location.replace('./login.html')
        }
    }
}

//header

export const handleIndexHeader = () => {
    const buttonList = document.querySelectorAll('.index__nav > button')
    const contactContainer = document.querySelector('#index__contact__container')

    buttonList.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === 'Usuário'){
                location.replace('./usuario/home.html')
            } else if (button.innerText === 'Parceiro'){
                location.replace('./parceiro/login.html')
            } else if (button.innerText === 'Contato'){
                contactContainer.classList.toggle('display-none');
            }
        })
    });
}

export const handleUsuarioHeader = () => {
    const buttonList = document.querySelectorAll('#usuario__header__nav > button')

    buttonList.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === 'Login'){
                location.replace('../usuario/login.html');
            } else if (button.innerText === 'Cadastrar Parceiro'){
                location.replace('../usuario/cadastro.html');
            } else if (button.innerText === 'Home'){
                location.replace('../index.html');
            } else if (button.innerText === 'Logout'){
                toast('green', 'Desconectando');
                localStorage.removeItem('@uServ: userToken');
                setTimeout(() =>{
                    location.replace('./login.html');
                },1500);
            };
        });
    });
};

export const handleParceiroHeader = () => {
    const buttonList = document.querySelectorAll('#partner__header__nav > button')

    buttonList.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === 'Login'){
                location.replace('../parceiro/login.html');
            } else if (button.innerText === 'Cadastrar Parceiro'){
                location.replace('../parceiro/cadastro.html');
            } else if (button.innerText === 'Home'){
                location.replace('../index.html');
            } else if (button.innerText === 'Logout'){
                toast('green', 'Desconectando');
                localStorage.removeItem('@uServ: partnerToken');
                setTimeout(() =>{
                    location.replace('../parceiro/login.html');
                },1500);
            };
        });
    });
};


//utilities
export const getCategoryImageInfo = (mode, name) => {
    const foundCategory = categories.find((category) => category.name == name);
    if (foundCategory){
        return mode === 'src' ? foundCategory.src : foundCategory.alt;
    }
    return '';
};

 export const formatPhoneNumber = (phoneNumber) => {
    const areaCode = phoneNumber.slice(0, 2);
    const firstDigit = phoneNumber.slice(2, 3);
    const middleDigits = phoneNumber.slice(3, 7);
    const lastDigits = phoneNumber.slice(7);
  
    return `(${areaCode}) ${firstDigit} ${middleDigits} - ${lastDigits}`;
}

export const formatPrice = (number) => {
    let BRReal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    return BRReal.format(number);
};