import {requestMemos, createMemo, deleteMemo} from '../Services/memos.js'


//ACTIONS
const GET_MEMOS_REQUEST = 'memos/MEMOS/GET_MEMOS_REQUEST';
const GET_MEMOS_SUCCESS = 'memos/MEMOS/GET_MEMOS_SUCCESS';
const GET_MEMOS_FAILURE = 'memos/MEMOS/GET_MEMOS_FAILURE';

const CREATE_MEMO_REQUEST = 'memos/MEMOS/CREATE_MEMO_REQUEST';
const CREATE_MEMO_SUCCESS = 'memos/MEMOS/CREATE_MEMO_SUCCESS';
const CREATE_MEMO_FAILURE = 'memos/MEMOS/CREATE_MEMO_FAILURE';

const DELETE_MEMO_REQUEST = 'memos/MEMOS/DELETE_MEMO_REQUEST';
const DELETE_MEMO_SUCCESS = 'memos/MEMOS/DELETE_MEMO_SUCCESS';
const DELETE_MEMO_FAILURE = 'memos/MEMOS/DELETE_MEMO_FAILURE';

const LOGOUT = 'memos/user/LOGOUT';

//REDUCER
const initialState = {
    getMemosPending: false,
    getMemosFailure: false,
    createMemoPending: false,
    createMemoFailure: false,
    deleteMemoPending: false,
    deleteMemoFailure: false,
    memos: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MEMOS_REQUEST:
            return {
                ...state,
                getMemosPending: true
            }

        case GET_MEMOS_SUCCESS:
            return {
                ...state,
                getMemosPending: false,
                getMemosFailure: false,
                memos: action.memos
            }

        case GET_MEMOS_FAILURE:
            return {
                ...state,
                getMemosPending: false,
                getMemosFailure: true
            }

        case CREATE_MEMO_REQUEST:
            return {
                ...state,
                createMemoPending: true
            }

        case CREATE_MEMO_SUCCESS:
            return {
                ...state,
                createMemoPending: false,
                createMemoFailure: false,
            }

        case CREATE_MEMO_FAILURE:
            return {
                ...state,
                createMemoPending: false,
                createMemoFailure: true
            }
        case DELETE_MEMO_REQUEST:
            return {
                ...state,
                deleteMemoPending: true,
                deleteMemoFailure: false
            }

        case DELETE_MEMO_SUCCESS:
            return {
                ...state,
                deleteMemoPending: false,
                deleteMemoFailure: false,
            }

        case DELETE_MEMO_FAILURE:
            console.log('delete memo failure')
            return {
                ...state,
                deleteMemoPending: false,
                deleteMemoFailure: true
            }

        default:
            return state;
    }
}

//ACTION CREATORS
function getMemosRequest() {
    return {type: GET_MEMOS_REQUEST}
}

function getMemosSuccess(memos) {
    return {
        type: GET_MEMOS_SUCCESS,
        memos: memos
    }
}

function getMemosFailure() {
    return {type: GET_MEMOS_FAILURE}
}

function createMemoRequest() {
    return {type: CREATE_MEMO_REQUEST}
}

function createMemoSuccess(memos) {
    return {
        type: CREATE_MEMO_SUCCESS
    }
}

function createMemoFailure() {
    return {type: CREATE_MEMO_FAILURE}
}

function deleteMemoRequest() {
    return {type: DELETE_MEMO_REQUEST}
}

function deleteMemoSuccess(memos) {
    return {
        type: DELETE_MEMO_SUCCESS
    }
}

function deleteMemoFailure() {
    return {type: DELETE_MEMO_FAILURE}
}

// export function logout() {
//     return {type: LOGOUT}
// }

// //SIDE EFFECTS
export function initiateGetMemos() {
    return function getMemos(dispatch, getState) {
        dispatch(getMemosRequest())
        requestMemos(getState().user.token).then(response => {
            console.log(response);
            if (!response.ok) {
                dispatch(getMemosFailure())
                return
            }

            response.json().then(json => {
                if (!json.memo_list) {
                    console.log('getMemosFailure')
                    dispatch(getMemosFailure())
                }

                dispatch(getMemosSuccess(json.memo_list))
            }, () => dispatch(getMemosFailure))
        }, () => dispatch(getMemosFailure))
    }
}

export function initiateCreateMemo(memo) {
    return function createMemoDispatcher(dispatch, getState) {
        dispatch(createMemoRequest())
        createMemo(getState().user.token, memo).then(response => {
            console.log(response);
            if (!response.ok) {
                dispatch(createMemoFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getMemosFailure')
                    dispatch(createMemoFailure())
                    return
                }

                if (json.message !== 'created') {
                    console.log('createMemoFailure')
                    dispatch(createMemoFailure())
                    return
                }

                dispatch(createMemoSuccess())
                dispatch(initiateGetMemos())
            } , () => dispatch(createMemoFailure()))
        }, () => dispatch(createMemoFailure()))
    }
}

export function initiateDeleteMemo(memo) {
    return function deleteMemoDispatcher(dispatch, getState) {
        dispatch(deleteMemoRequest())
        deleteMemo(getState().user.token, memo).then(response => {
            console.log(response);
            if (!response.ok) {
                console.log('response was not ok')
                dispatch(deleteMemoFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getMemosFailure')
                    dispatch(deleteMemoFailure())
                }

                if (json.message !== 'deleted') {
                    console.log('deleteMemoFailure')
                    dispatch(deleteMemoFailure())
                }
                dispatch(deleteMemoSuccess())
                dispatch(initiateGetMemos())
            }, () => dispatch(deleteMemoFailure()))
        }, () => dispatch(deleteMemoFailure()))
    }
}
