import { serviceFetch } from "./service.js"

export const createService = async (articleData) => {
    let response = await serviceFetch('/article/create', 'POST', articleData);
    return response;
};

export const getListService = async () => {
    let response = await serviceFetch('/article/list', 'GET');
    return response;
};

export const getOneService= async (id) => {
    let response = await serviceFetch(`/article/${id}`, 'GET');
    return response;
};