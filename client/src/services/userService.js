import { serviceFetch } from "./service.js"

export const loginService = async (userData) => {
    let response = await serviceFetch('/user/login', 'POST', userData);
    return response;
};

export const registerService = async (userData) => {
    let response = await serviceFetch('/user/register', 'POST', userData);
    return response;
};

export const getUserList = async () => {
    let response = await serviceFetch('/user/list', 'GET');
    return response;
};

export const logoutUser = async () => {
    let response = await serviceFetch('/user/logout', 'POST');
    return response;
};