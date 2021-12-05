const baseUrl = () => {
    if (process.env.NODE_ENV === "production") {
        return process.env.REACT_APP_BASE_URL + "/api";
    }
    else {
        return `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`
    }
}

export const serviceFetch = async (url, method, currData) => {
    let body = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currData)
    }
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl()}${url}`, body)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(e => reject({ status: e.status, statusCode: e.statusCode }))
    })
}