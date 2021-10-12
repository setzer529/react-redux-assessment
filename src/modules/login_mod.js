// import {requestLogin} from '../Services/user.js'
import {requestLogin} from '../Services/login_svc.js'
import {initiateGetMemos} from "./memos";

//ACTIONS
const LOGIN_REQUEST = 'memos/user/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'memos/user/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'memos/user/LOGIN_FAIL';

const LOGOUT = 'memos/user/LOGOUT';

//REDUCER
const initialState = {
    loginPending: false,
    loginFailed: false,
    token: ''

}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loginPending: true
            }

        case LOGIN_SUCCESS:
            console.log(`login success`)
            console.log(action);
            return {
                ...state,
                loginPending: false,
                loginFailure: false,
                token: action.token
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loginPending: false,
                loginFailure: true
            }

        case LOGOUT:
            return {
                ...state,
                token: ''
            }

        default:
            return state;
    }
}

//ACTION CREATORS
export function loginRequest() {
    return {type: LOGIN_REQUEST}
}

export function loginSuccess(token) {
    console.log(token);
    return {
        type: LOGIN_SUCCESS,
        token: token
    }
}

export function loginFailure() {
    return {type: LOGIN_FAILURE}
}

export function logout() {
    return {type: LOGOUT}
}

//SIDE EFFECTS
export function initiateLogin(credentials) {
    return function login(dispatch) {
        dispatch(loginRequest())
        requestLogin(credentials).then(response => {
            console.log(response);
            if (!response.ok) {

                dispatch(loginFailure())
                return
            }

            response.json().then(data => {
                console.log(data.token);
                if (!data.token) {
                    dispatch(loginFailure())
                    return
                }

                dispatch(loginSuccess(data.token))
                dispatch(initiateGetMemos())
            }, () => dispatch(loginFailure()))
        }, () => dispatch(loginFailure()))
    }
}