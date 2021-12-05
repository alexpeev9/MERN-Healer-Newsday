import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";

const jwtDecodeUtil = (token) => {
    return jwtDecode(token)
}

export const setCookie = (token) => {
    let payload = jwtDecodeUtil(token);
    const username = payload.username;
    const userId = payload._id;
    const isAdmin = payload.isAdmin;

    const options = {  expires: 7, path: '/', secure: true }
    Cookies.set("jwt-token", token, options);
    Cookies.set("username", username, options);
    Cookies.set("userId", userId, options);
    Cookies.set("isAdmin", isAdmin, options);
};

export const removeCookies = () => {
    Cookies.remove("jwt-token");
    Cookies.remove("username");
    Cookies.remove("userId");
    Cookies.remove("isAdmin");
};

const getCookie = (name) => {
    return Cookies.get(name);
};

export const getTokenCookie = () => getCookie("jwt-token");
export const getUsernameCookie = () => getCookie("username");
export const getUserIdCookie = () => getCookie("userId");
export const getIsAdminCookie = () => getCookie("isAdmin");