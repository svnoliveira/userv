const baseUrl = 'https://viacep.com.br/ws/';

import { toast } from "../render.js";

export const getCep = async (cep) =>{
    const data = fetch(`${baseUrl}${cep}/json/`, {
        method: 'GET',
    })
    .then(async (res) => {
        if (res.ok){
            const response = await res.json();
            return response;
        } else {
            const response = await res.json()
            toast('red', response.message)
        }
    });
    return data;
}