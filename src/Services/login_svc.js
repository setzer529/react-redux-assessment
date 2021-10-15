import config from '../config.js'

export function requestLogin(credentials) {
    return fetch(`${config.baseURL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}

export function requestCreateUser(credentials) {
    return fetch(`${config.baseURL}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}