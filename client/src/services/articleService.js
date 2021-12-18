import { serviceFetch } from "./service.js"

export const createService = async (articleData) => {
    let response = await serviceFetch('/article/create', 'POST', articleData);
    return response;
};