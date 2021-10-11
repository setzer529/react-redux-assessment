const base_url = 'http://localhost:3001/api'

export function requestMemos(token) {
    console.log(`requestMemos token = ${token}`)
    return fetch(base_url + '/memo', {
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
    return fetch(base_url + '/memo', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(memo)
    })
}

export function deleteMemo(token, memo) {

    return fetch(base_url + '/memo/' + memo.id, {
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