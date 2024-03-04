// general functions

export const toast = (color, message) => {
    const red = '#FF5630';
    const green = '#36B37E';
    let selectedColor = '';
    
    if (color == `red`){
        selectedColor = red
    } else if (color == 'green'){
        selectedColor = green
    }

    const toastContainer = document.createElement(`div`)
    const main = document.querySelector('body')
    toastContainer.classList.add(`toast`)
    toastContainer.innerText = message
    toastContainer.style.backgroundColor = selectedColor
    main.appendChild(toastContainer);

    setTimeout( function(){ 
        toastContainer.remove(); 
    }, 3000);
}

export const userRouteProtection = (mode) => {
    const userToken = localStorage.getItem("@uServ: userToken")
    if (mode === "open"){
        if (userToken){
            location.replace('./home.html')
        }
    } else if (mode === "closed") {
        if (!userToken){
            location.replace('./login.html')
        }
    }
}

//

export const handleIndexHeader = () => {
    const buttonList = document.querySelectorAll('.index__nav > button')
    const contactContainer = document.querySelector('#index__contact__container')

    buttonList.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === 'Usuário'){
                location.replace('./usuario/home.html')
            } else if (button.innerText === 'Fornecedor'){
                location.replace('./fornecedor/login.html')
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
                location.replace('./usuario/login.html')
            } else if (button.innerText === 'Cadastro'){
                location.replace('./usuario/cadastro.html')
            } else if (button.innerText === 'Home'){
                location.replace('../../index.html')
            } else if (button.innerText === 'Logout'){
                toast('green', 'Desconectando')
                localStorage.clear()
                setTimeout(() =>{
                    location.replace('./login.html')
                },1500)
            }
        })
    });
}