import { serviceFetch } from "./service.js"

export const login = async (userData) => {
    let response = await serviceFetch('/user/login', 'POST', userData);
    return response;
};

export const register = async (userData) => {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL} + "/api/user/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    let result = await response.json();
    return result;
};