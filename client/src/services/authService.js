const baseUrl = () => {
    if(process.env.NODE_ENV === "production")
    {
        return process.env.BASEURL+"/api";
    }
    else{
        return `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`
    }
}

export const login = async (userData) => {
    let response = await fetch(`${baseUrl()}/user/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    let result = await response.json();
    return result;
};

export const register = async (userData) => {
    let response = await fetch(`${baseUrl()}/user/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    let result = await response.json();
    return result;
};