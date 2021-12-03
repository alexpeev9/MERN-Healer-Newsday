import { serviceFetch } from "./service.js"

export const login = async (userData) => {
    let response = await serviceFetch('/user/login', 'POST', userData);
    return response;
};

export const register = async (userData) => {
    let response = await serviceFetch('/user/register', 'POST', userData);
    return response;
};