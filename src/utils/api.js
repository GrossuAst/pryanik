import { apiConfig } from "./constants";
import { BASE_URL } from "./constants";

function checkRespone(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export function login() {
    return fetch(`${BASE_URL}/ru/data/v3/testmethods/docs/login`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({ username: 'user1', password: 'password' })
    }).then((res) => {
        return checkRespone(res);
    })
};

export function getData(token) {
    return fetch(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/get`, {
        method: 'GET',
        headers: {
            ...apiConfig.headers,
            'x-auth': token
        }
    }).then((res) => {
        return checkRespone(res);
    })
};

export function createEntry(token) {
    return fetch(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/create`, {
        method: 'POST',
        headers: {
            ...apiConfig.headers,
            'x-auth': token
        }
    }).then((res) => {
        return checkRespone(res);
    })
};