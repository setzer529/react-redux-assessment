import {requestInvite, createInvite, updateInvite, deleteInvite, requestInvites,} from '../Services/invites_svc.js'

//ACTIONS
const GET_INVITE_REQUEST = 'invite/INVITE/GET_INVITE_REQUEST';
const GET_INVITE_SUCCESS = 'invite/INVITE/GET_INVITE_SUCCESS';
const GET_INVITE_FAILURE = 'invite/INVITE/GET_INVITE_FAILURE';

const CREATE_INVITE_REQUEST = 'invites/INVITES/CREATE_INVITE_REQUEST';
const CREATE_INVITE_SUCCESS = 'invites/INVITES/CREATE_INVITE_SUCCESS';
const CREATE_INVITE_FAILURE = 'invites/INVITES/CREATE_INVITE_FAILURE';

const UPDATE_INVITE_REQUEST = 'invites/INVITES/UPDATE_INVITE_REQUEST';
const UPDATE_INVITE_SUCCESS = 'invites/INVITES/UPDATE_INVITE_SUCCESS';
const UPDATE_INVITE_FAILURE = 'invites/INVITES/UPDATE_INVITE_FAILURE';

const DELETE_INVITE_REQUEST = 'invites/INVITES/DELETE_INVITE_REQUEST';
const DELETE_INVITE_SUCCESS = 'invites/INVITES/DELETE_INVITE_SUCCESS';
const DELETE_INVITE_FAILURE = 'invites/INVITES/DELETE_INVITE_FAILURE';

const GET_INVITES_REQUEST = 'invites/INVITES/GET_INVITES_REQUEST';
const GET_INVITES_SUCCESS = 'invites/INVITES/GET_INVITES_SUCCESS';
const GET_INVITES_FAILURE = 'invites/INVITES/GET_INVITES_FAILURE';

//REDUCER
const initialState = {
    getInvitePending: false,
    getInviteFailure: false,
    createInvitePending: false,
    createInviteFailure: false,
    updateInvitePending: false,
    updateInviteFailure: false,
    deleteInvitePending: false,
    deleteInviteFailure: false,
    getInvitesPending: false,
    getInvitesFailure: false,
    invite: '',
    invites: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_INVITE_REQUEST:
            return {
                ...state,
                getInvitePending: true
            }

        case GET_INVITE_SUCCESS:
            return {
                ...state,
                getInvitePending: false,
                getInviteFailure: false,
                invite: action.invite
            }

        case GET_INVITE_FAILURE:
            return {
                ...state,
                getInvitePending: false,
                getInviteFailure: true
            }

        case CREATE_INVITE_REQUEST:
            return {
                ...state,
                createInvitePending: true
            }
        case CREATE_INVITE_SUCCESS:
            return {
                ...state,
                createInvitePending: false,
                createInviteFailure: false,
            }
        case CREATE_INVITE_FAILURE:
            return {
                ...state,
                createInvitePending: false,
                createInviteFailure: true
            }

        case UPDATE_INVITE_REQUEST:
            return {
                ...state,
                updateInvitePending: true
            }
        case UPDATE_INVITE_SUCCESS:
            return {
                ...state,
                updateInvitePending: false,
                updateInviteFailure: false,
            }
        case UPDATE_INVITE_FAILURE:
            return {
                ...state,
                updateInvitePending: false,
                updateInviteFailure: true
            }

        case DELETE_INVITE_REQUEST:
            return {
                ...state,
                deleteInvitePending: true,
                deleteInviteFailure: false
            }
        case DELETE_INVITE_SUCCESS:
            return {
                ...state,
                deleteInvitePending: false,
                deleteInviteFailure: false,
            }
        case DELETE_INVITE_FAILURE:
            return {
                ...state,
                deleteInvitePending: false,
                deleteInviteFailure: true
            }

        case GET_INVITES_REQUEST:
            return {
                ...state,
                getInvitesPending: true
            }
        case GET_INVITES_SUCCESS:
            return {
                ...state,
                getInvitesPending: false,
                getInvitesFailure: false,
                invites: action.invites
            }
        case GET_INVITES_FAILURE:
            return {
                ...state,
                getInvitesPending: false,
                getInvitesFailure: true
            }

        default:
            return state;
    }
}

//ACTION CREATORS
// GET INVITE
function getInviteRequest() {
    return {type: GET_INVITE_REQUEST}
}
function getInviteSuccess(invite) {
    return {
        type: GET_INVITE_SUCCESS,
        invite: invite
    }
}
function getInviteFailure() {
    return {type: GET_INVITE_FAILURE}
}

// CREATE INVITE
function createInviteRequest() {
    return {type: CREATE_INVITE_REQUEST}
}
function createInviteSuccess(event) {
    return {
        type: CREATE_INVITE_SUCCESS
    }
}
function createInviteFailure() {
    return {type: CREATE_INVITE_FAILURE}
}

// UPDATE INVITE
function updateInviteRequest() {
    return {type: UPDATE_INVITE_REQUEST}
}
function updateInviteSuccess(event) {
    return {
        type: UPDATE_INVITE_SUCCESS
    }
}
function updateInviteFailure() {
    return {type: UPDATE_INVITE_FAILURE}
}

//DELETE INVITE
function deleteInviteRequest() {
    return {type: DELETE_INVITE_REQUEST}
}
function deleteInviteSuccess(events) {
    return {
        type: DELETE_INVITE_SUCCESS
    }
}
function deleteInviteFailure() {
    return {type: DELETE_INVITE_FAILURE}
}

//GET INVITES
function getInvitesRequest() {
    return {type: GET_INVITES_REQUEST}
}
function getInvitesSuccess(invites) {
    return {
        type: GET_INVITES_SUCCESS,
        invites: invites
    }
}
function getInvitesFailure() {
    return {type: GET_INVITES_FAILURE}
}


//SIDE EFFECTS
export function initiateGetInvite(event) {
    return function getInvite(dispatch, getState) {
        dispatch(getInviteRequest())

        requestInvite(getState().user.token, event).then(response => {

            if (!response.ok) {
                dispatch(getInviteFailure())
                return
            }

            response.json().then(json => {
                if (!json.invite) {
                    console.log('getInviteFailure')
                    dispatch(getInviteFailure())
                }

                dispatch(getInviteSuccess(json.invite))
            }, () => dispatch(getInviteFailure))
        }, () => dispatch(getInviteFailure))
    }
}

export function initiateCreateInvite(event) {
    console.log(`event at initiate Create Invite: ${event}`)
    return function createInviteDispatcher(dispatch, getState) {
        dispatch(createInviteRequest())
        createInvite(getState().user.token, event).then(response => {
            console.log(`response from createInvite = ${response}`)
            if (!response.ok) {
                dispatch(createInviteFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getInvitesFailure')
                    dispatch(createInviteFailure())
                    return
                }

                if (json.message !== 'Invite Created') {
                    console.log('createInviteFailure')
                    dispatch(createInviteFailure())
                    return
                }

                dispatch(createInviteSuccess())
                dispatch(initiateGetInvites())
            }, () => dispatch(createInviteFailure()))
        }, () => dispatch(createInviteFailure()))
    }
}

export function initiateUpdateInvite(event) {
    return function updateInviteDispatcher(dispatch, getState) {
        dispatch(updateInviteRequest())
        updateInvite(getState().user.token, event).then(response => {
            console.log(`response from updateInvite = ${response}`)
            if (!response.ok) {
                dispatch(updateInviteFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getInvitesFailure')
                    dispatch(updateInviteFailure())
                    return
                }

                if (json.message !== 'Invite Updated') {
                    console.log('updateInviteFailure')
                    dispatch(updateInviteFailure())
                    return
                }

                dispatch(updateInviteSuccess())
                dispatch(initiateGetInvites())
            }, () => dispatch(updateInviteFailure()))
        }, () => dispatch(updateInviteFailure()))
    }
}

export function initiateDeleteInvite(event) {
    return function deleteInviteDispatcher(dispatch, getState) {
        dispatch(deleteInviteRequest())
        deleteInvite(getState().user.token, event).then(response => {
            console.log(response);
            if (!response.ok) {
                console.log('response was not ok')
                dispatch(deleteInviteFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getInvitesFailure')
                    dispatch(deleteInviteFailure())
                }

                if (json.message !== 'Invite Deleted') {
                    console.log('deleteInviteFailure')
                    dispatch(deleteInviteFailure())
                }
                dispatch(deleteInviteSuccess())
                dispatch(initiateGetInvites())
            }, () => dispatch(deleteInviteFailure()))
        }, () => dispatch(deleteInviteFailure()))
    }
}

export function initiateGetInvites(event) {
    return function getInvites(dispatch, getState) {
        dispatch(getInvitesRequest())

        requestInvites(getState().user.token, event).then(response => {

            if (!response.ok) {
                dispatch(getInvitesFailure())
                return
            }

            response.json().then(json => {
                if (!json.invites) {
                    console.log('getInvitesFailure')
                    dispatch(getInvitesFailure())
                }

                dispatch(getInvitesSuccess(json.invites))
            }, () => dispatch(getInvitesFailure))
        }, () => dispatch(getInvitesFailure))
    }
}
