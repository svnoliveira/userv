const baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

import { toast } from "../render.js";

export const getCitiesFromUF = async (uf) =>{
    const list = fetch(`${baseUrl}/${uf}/municipios`, {
        method: 'GET',
    })
    .then(async (res) => {
        if (res.ok){
            const response = await res.json();
            return response;
        } else {
            const response = await res.json()
            console.log(response.message)
            toast('red', response.message)
        }
    });
    return list;
}
