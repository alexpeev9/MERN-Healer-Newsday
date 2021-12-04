import { serviceFetch } from "./service.js"

export const loginService = async (userData) => {
    let response = await serviceFetch('/user/login', 'POST', userData);
    return response;
};

export const registerService = async (userData) => {
    let response = await serviceFetch('/user/register', 'POST', userData);
    return response;
};