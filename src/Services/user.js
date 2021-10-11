const base_url='http://localhost:3001/api'

export function requestLogin(credentials) {
    console.log(`credentials=${JSON.stringify(credentials)}`)
    return fetch(base_url + '/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}