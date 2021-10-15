import config from '../config.js'

export function requestReminder(token, event) {
    return fetch(`${config.baseURL}/reminder/${event.id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    })
}

export function createReminder(token, event) {
    return fetch(`${config.baseURL}/reminder`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function updateReminder(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/reminder`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function deleteReminder(token, event) {
    return fetch(`${config.baseURL}/reminder`, {
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

export function requestReminders(token, event) {
    return fetch(`${config.baseURL}/reminder/dates`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}