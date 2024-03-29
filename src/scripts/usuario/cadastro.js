import { handleUsuarioHeader, userRouteProtection } from "../render.js";

userRouteProtection("open");
const handleRegistration = () => {
    
    const inputs = document.querySelectorAll('input')
    const button = document.querySelectorAll('form > button')

    
    const registerButton = button[0]
    
    registerButton.addEventListener('click', async (event) => {
        event.preventDefault()
        const name = inputs[0].value
        const email = inputs[1].value
        const password = inputs[2].value
        const confirm = inputs[3].value

        if (name === '' || email === '' || password === '' || confirm === ''){
            toast('red', 'Não deixe campos em branco');
        } else {
            // const message = await registerNewUser(name, email, password);
            console.log({name, email, password})
            // console.log(message);
        }
    })
}

handleRegistration();
handleUsuarioHeader();