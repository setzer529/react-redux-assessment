import config from '../config.js'

export function requestInvite(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/invite/${event.id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    })
}

export function createInvite(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/invite`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function updateInvite(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/invite`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function deleteInvite(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/invite`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: event.id
        })
    })
}

export function requestInvites(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/invite/dates`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}