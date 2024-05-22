import { apiConfig } from "./constants";
import { BASE_URL } from "./constants";

function checkRespone(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export function login(data) {
    return fetch(`${BASE_URL}/ru/data/v3/testmethods/docs/login`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({ username: data.username, password: data.password })
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

export function createEntry(token, data) {
    return fetch(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/create`, {
        method: 'POST',
        headers: {
            ...apiConfig.headers,
            'x-auth': token
        },
        body: JSON.stringify({ 
            companySigDate: data.companySigDate,  
            companySignatureName: data.companySignatureName,
            documentName: data.documentName,
            documentStatus: data.documentStatus,
            documentType: data.documentType,
            employeeNumber: data.employeeNumber,
            employeeSigDate: data.employeeSigDate,
            employeeSignatureName: data.employeeSignatureName
        })
    }).then((res) => {
        return checkRespone(res);
    })
};

export function deleteEntry(token, id) {
    return fetch(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
        method: 'POST',
        headers: {
            ...apiConfig.headers,
            'x-auth': token
        }
    }).then((res) => {
        return checkRespone(res);
    })
};

export function editEntry(token, id, values) {
    console.log(values)
    return fetch(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
        method: 'POST',
        headers: {
            ...apiConfig.headers,
            'x-auth': token
        },
        body: JSON.stringify({ 
            companySigDate: values.companySigDate,  
            companySignatureName: values.companySignatureName,
            documentName: values.documentName,
            documentStatus: values.documentStatus,
            documentType: values.documentType,
            employeeNumber: values.employeeNumber,
            employeeSigDate: values.employeeSigDate,
            employeeSignatureName: values.employeeSignatureName
        })
        }).then((res) => {
            return checkRespone(res);
    })
}