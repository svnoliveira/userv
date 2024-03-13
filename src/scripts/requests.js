//request da API local.
const userToken = JSON.parse(localStorage.getItem("@uServ: userToken")) || ""
const partnerToken = JSON.parse(localStorage.getItem("@uServ: partnerToken")) || ""
const baseUrl = 'http://localhost:3333';
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization : `Bearer ${userToken}`
}

import { toast } from "./render.js";

//login request exemplo
// export const loginUser = async (userEmail, userPassword) =>{
//     const token = fetch(`${baseUrl}/auth/login`, {
//         method: 'POST',
//         headers: requestHeaders,
//         body: JSON.stringify({
//             email: userEmail,
//             password: userPassword
//         })
//     })
//     .then(async (res) => {
//         if (res.ok){
//             const response = await res.json()
//             if (response.isAdm){
//                 localStorage.setItem("@uServ: admin", "yes")
//                 localStorage.setItem("@uServ: userToken", JSON.stringify(response.authToken))
//                 toast('green', 'Login efetuado com sucesso')
//                 setTimeout(() => { 
//                     location.replace('./admin.html')
//                     return response.authToken
//                 }, 3000);
//             } else {
//                 localStorage.setItem("@uServ: admin", "no")
//                 localStorage.setItem("@uServ: userToken", JSON.stringify(response.authToken))
//                 toast('green', 'Login efetuado com sucesso')
//                 setTimeout(() => { 
//                     location.replace('./home.html')
//                     return response.authToken
//                 }, 3000);
//             }
//         } else {
//             const response = await res.json()
//             toast('red', response.message)
//         }
//     })
//     return token
// }

export const mockLogin = (userEmail, userPassword) => {
    if(userEmail.length > 3 && userPassword.length > 3){
        toast('green', 'Login efetuado com sucesso');
        localStorage.setItem("@uServ: userToken", JSON.stringify("1234568987"));
        setTimeout(() => { 
            location.replace('./home.html')
            return response.authToken
        }, 2000);
    } else {
        toast('red', "Login falhou");
    };
};

export const mockPartnerLogin = (partnerEmail, partnerPassword) => {
    if(partnerEmail.length > 3 && partnerPassword.length > 3){
        toast('green', 'Login efetuado com sucesso');
        localStorage.setItem("@uServ: partnerToken", JSON.stringify("1234568987"));
        location.replace('../painel/home.html');
    } else {
        toast('red', "Login falhou");
    };
};