//todo DELETE
// import {requestLogin} from '../Services/user.js'
// import {initiateGetMemos} from "./memos";
import {requestLogin, requestCreateUser} from '../Services/login_svc.js'
import {initiateGetEvents} from './events_mod.js';
import {initiateGetReminders} from './reminders_mod.js';
import {initiateGetTasks} from './tasks_mod.js';



//ACTIONS
const LOGIN_REQUEST = 'memos/user/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'memos/user/LOGIN_SUCCESS';
const LOGIN_FAILED = 'memos/user/LOGIN_FAILED';
const CREATE_USER_REQUEST = 'memos/user/CREATE_USER_REQUEST';
const CREATE_USER_SUCCESS = 'memos/user/CREATE_USER_SUCCESS';
const CREATE_USER_FAILED = 'memos/user/CREATE_USER_FAILED';
const LOGOUT = 'memos/user/LOGOUT';

//REDUCER
const initialState = {
    createUserPending: false,
    createUserFailed: false,
    loginPending: false,
    loginFailed: false,
    token: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                createUserPending: true
            }

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUserPending: false,
                createUserFailed: false,
            }

        case CREATE_USER_FAILED:
            return {
                ...state,
                createUserPending: false,
                createUserFailed: true
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                loginPending: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loginPending: false,
                loginFailure: false,
                token: action.token
            }

        case LOGIN_FAILED:
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
    return {type: LOGIN_FAILED}
}

export function logout() {
    return {type: LOGOUT}
}

export function createUserRequest() {
    return {type: CREATE_USER_REQUEST}
}

export function createUserSuccess() {
    return {
        type: CREATE_USER_SUCCESS
    }
}

export function createUserFailure() {
    return {type: CREATE_USER_FAILED}
}

//SIDE EFFECTS
export function initiateLogin(credentials) {
    if (credentials.newUser === false) {
        return function login(dispatch) {
            dispatch(loginRequest())
            requestLogin(credentials).then(response => {
                if (!response.ok) {

                    dispatch(loginFailure())
                    return
                }

                response.json().then(data => {
                    if (!data.token) {
                        dispatch(loginFailure())
                        return
                    }

                    dispatch(loginSuccess(data.token))
                    dispatch(initiateGetEvents())
                    dispatch(initiateGetReminders())
                    dispatch(initiateGetTasks())

                }, () => dispatch(loginFailure()))
            }, () => dispatch(loginFailure()))
        }
    } else {
        return function createUser(dispatch) {
            dispatch(createUserRequest())
            requestCreateUser(credentials).then(response => {
                if (!response.ok) {
                    dispatch(createUserFailure())
                    return
                }

                dispatch(createUserSuccess())

            }, () => dispatch(createUserFailure()))
        }
    }
}