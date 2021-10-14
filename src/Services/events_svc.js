import config from '../config.js'

export function requestEvent(token, event) {
    return fetch(`${config.baseURL}/event/${event.id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(event)
    })
}

export function createEvent(token, event) {

    return fetch(`${config.baseURL}/event`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function updateEvent(token, event) {
    console.log(`EVENT at put request = ${JSON.stringify(event)}`)
    console.log(`event id at put request = ${event.id}`)
    return fetch(`${config.baseURL}/event/${event.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function deleteEvent(token, event) {
    return fetch(`${config.baseURL}/event`, {
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

export function requestEvents(token, event) {
    return fetch(`${config.baseURL}/event/dates`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}