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

export const updateService= async (id, articleData) => {
    let response = await serviceFetch(`/article/edit/${id}`, 'PUT', articleData);
    return response;
};

export const deleteOneService= async (id) => {
    let response = await serviceFetch(`/article/delete/${id}`, 'DELETE');
    return response;
};

export const upVoteService= async (id) => {
    let response = await serviceFetch(`/article/upvote/${id}`, 'GET');
    return response;
};

export const downVoteService= async (id) => {
    let response = await serviceFetch(`/article/downvote/${id}`, 'GET');
    return response;
};