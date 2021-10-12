import config from '../config.js'

export function requestMemos(token) {
    console.log(`requestMemos token = ${token}`)
    return fetch(`${config.baseURL}/memo`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
}

export function createMemo(token, memo) {
    console.log(token);
    console.log(memo);
    return fetch(`${config.baseURL}/memo`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(memo)
    })
}

export function deleteMemo(token, memo) {

    return fetch(`${config.baseURL}/memo/${memo.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            create_timestamp: memo.create_timestamp
        })
    })
}