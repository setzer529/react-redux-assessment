//todo copied from user.js, needs update

import config from '../config.js'

export function requestLogin(credentials) {
    // console.log(`credentials=${JSON.stringify(credentials)}`)
    return fetch(`${config.baseURL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}

export function requestCreateUser(credentials) {
    // console.log(`credentials=${JSON.stringify(credentials)}`)
    return fetch(`${config.baseURL}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}