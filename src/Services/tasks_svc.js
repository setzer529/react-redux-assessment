import config from '../config.js'

export function requestTask(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/task/${event.id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    })
}

export function createTask(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/task`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function updateTask(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/task`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function deleteTask(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/task`, {
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

export function requestTasks(token, event) {
    console.log(event)
    return fetch(`${config.baseURL}/task/dates`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}