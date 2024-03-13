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
    const userToken = localStorage.getItem("@uServ: userToken");
    const navBar = document.querySelector('#usuario__header__nav');
    const partners = document.createElement('button');

    partners.classList.add('btn--nav');
    partners.innerText = 'Parceiros';
    navBar.appendChild(partners);
    partners.addEventListener('click', (event) => {
        location.replace('./parceiro/cadastro.html');
    });

    if (userToken) {
        const logout = document.createElement('button');
        const userName = document.createElement('button');

        logout.classList.add('btn--nav');
        logout.innerText = 'Logout';
        userName.classList.add('btn--nav');
        userName.innerText = 'Nome do Usuário';
        navBar.append(userName, logout);

        logout.addEventListener('click', (event) => {
            while (navBar.firstChild) {
                navBar.removeChild(navBar.firstChild);
            }
            const partners = document.createElement('button');
            const login = document.createElement('button');
            const register = document.createElement('button');

            partners.classList.add('btn--nav');
            partners.innerText = 'Parceiros';
            login.classList.add('btn--nav');
            login.innerText = 'Login';
            register.classList.add('btn--nav');
            register.innerText = 'Cadastro';
            navBar.append(partners, login, register);
            toast('green', 'Desconectando');
            localStorage.removeItem('@uServ: userToken');
            login.addEventListener('click', (event) => {
                location.replace('./usuario/login.html');
            });
            register.addEventListener('click', (event) => {
                location.replace('./usuario/cadastro.html');
            });
            partners.addEventListener('click', (event) => {
                location.replace('./parceiro/cadastro.html');
            });
        });

        userName.addEventListener('click', (event) => {
            location.replace('./usuario/home.html');
        });
    } else {
        const login = document.createElement('button');
        const register = document.createElement('button');

        login.classList.add('btn--nav');
        login.innerText = 'Login';
        register.classList.add('btn--nav');
        register.innerText = 'Cadastro';
        navBar.append(login, register);

        login.addEventListener('click', (event) => {
            location.replace('./usuario/login.html');
        });
        register.addEventListener('click', (event) => {
            location.replace('./usuario/cadastro.html');
        });
    };
};

export const handleUsuarioHeader = () => {
    const buttonList = document.querySelectorAll('#usuario__header__nav > button')

    buttonList.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === 'Login'){
                location.replace('../usuario/login.html');
            } else if (button.innerText === 'Cadastro'){
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