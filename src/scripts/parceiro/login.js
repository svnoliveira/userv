import { handleParceiroHeader, partnerRouteProtection } from "../render.js";
import { mockPartnerLogin } from "../requests.js";

partnerRouteProtection("open");

const handleLogin = () => {

    const loginButton = document.querySelector('form button');
    
    loginButton.addEventListener('click', async (event) => {
        event.preventDefault()
        const inputList = document.querySelectorAll('form input')
        const userName = inputList[0].value
        const password = inputList[1].value

        // await loginUser(userName, password)
        mockPartnerLogin(userName, password);
    })
}

handleParceiroHeader();
handleLogin();