import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";

const jwtDecodeUtil = (token) => {
    return jwtDecode(token)
}

export const setCookie = (JWTtoken) => {
    let token = JWTtoken.token;
    let payload = jwtDecodeUtil(token);
    const username = payload.username;
    const userId = payload._id;

    const options = {  expires: 7, path: '/', secure: true }
    Cookies.set("jwt-token", token, options);
    Cookies.set("username", username, options);
    Cookies.set("userId", userId, options);
};

export const removeCookies = () => {
    Cookies.remove("jwt-token");
    Cookies.remove("username");
    Cookies.remove("userId");
};

const getCookie = (name) => {
    return Cookies.get(name);
};

export const getTokenCookie = () => getCookie("jwt-token");
export const getUsernameCookie = () => getCookie("username");
export const getUserIdCookie = () => getCookie("userId");