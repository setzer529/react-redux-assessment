import {requestReminder, createReminder, updateReminder, deleteReminder, requestReminders,} from '../Services/reminders_svc.js'

//ACTIONS
const GET_REMINDER_REQUEST = 'reminder/REMINDER/GET_REMINDER_REQUEST';
const GET_REMINDER_SUCCESS = 'reminder/REMINDER/GET_REMINDER_SUCCESS';
const GET_REMINDER_FAILURE = 'reminder/REMINDER/GET_REMINDER_FAILURE';

const CREATE_REMINDER_REQUEST = 'reminders/REMINDERS/CREATE_REMINDER_REQUEST';
const CREATE_REMINDER_SUCCESS = 'reminders/REMINDERS/CREATE_REMINDER_SUCCESS';
const CREATE_REMINDER_FAILURE = 'reminders/REMINDERS/CREATE_REMINDER_FAILURE';

const UPDATE_REMINDER_REQUEST = 'reminders/REMINDERS/UPDATE_REMINDER_REQUEST';
const UPDATE_REMINDER_SUCCESS = 'reminders/REMINDERS/UPDATE_REMINDER_SUCCESS';
const UPDATE_REMINDER_FAILURE = 'reminders/REMINDERS/UPDATE_REMINDER_FAILURE';

const DELETE_REMINDER_REQUEST = 'reminders/REMINDERS/DELETE_REMINDER_REQUEST';
const DELETE_REMINDER_SUCCESS = 'reminders/REMINDERS/DELETE_REMINDER_SUCCESS';
const DELETE_REMINDER_FAILURE = 'reminders/REMINDERS/DELETE_REMINDER_FAILURE';

const GET_REMINDERS_REQUEST = 'reminders/REMINDERS/GET_REMINDERS_REQUEST';
const GET_REMINDERS_SUCCESS = 'reminders/REMINDERS/GET_REMINDERS_SUCCESS';
const GET_REMINDERS_FAILURE = 'reminders/REMINDERS/GET_REMINDERS_FAILURE';

//REDUCER
const initialState = {
    getReminderPending: false,
    getReminderFailure: false,
    createReminderPending: false,
    createReminderFailure: false,
    updateReminderPending: false,
    updateReminderFailure: false,
    deleteReminderPending: false,
    deleteReminderFailure: false,
    getRemindersPending: false,
    getRemindersFailure: false,
    reminder: '',
    reminders: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_REMINDER_REQUEST:
            return {
                ...state,
                getReminderPending: true
            }

        case GET_REMINDER_SUCCESS:
            return {
                ...state,
                getReminderPending: false,
                getReminderFailure: false,
                reminder: action.reminder
            }

        case GET_REMINDER_FAILURE:
            return {
                ...state,
                getReminderPending: false,
                getReminderFailure: true
            }

        case CREATE_REMINDER_REQUEST:
            return {
                ...state,
                createReminderPending: true
            }
        case CREATE_REMINDER_SUCCESS:
            return {
                ...state,
                createReminderPending: false,
                createReminderFailure: false,
            }
        case CREATE_REMINDER_FAILURE:
            return {
                ...state,
                createReminderPending: false,
                createReminderFailure: true
            }

        case UPDATE_REMINDER_REQUEST:
            return {
                ...state,
                updateReminderPending: true
            }
        case UPDATE_REMINDER_SUCCESS:
            return {
                ...state,
                updateReminderPending: false,
                updateReminderFailure: false,
            }
        case UPDATE_REMINDER_FAILURE:
            return {
                ...state,
                updateReminderPending: false,
                updateReminderFailure: true
            }

        case DELETE_REMINDER_REQUEST:
            return {
                ...state,
                deleteReminderPending: true,
                deleteReminderFailure: false
            }
        case DELETE_REMINDER_SUCCESS:
            return {
                ...state,
                deleteReminderPending: false,
                deleteReminderFailure: false,
            }
        case DELETE_REMINDER_FAILURE:
            return {
                ...state,
                deleteReminderPending: false,
                deleteReminderFailure: true
            }

        case GET_REMINDERS_REQUEST:
            return {
                ...state,
                getRemindersPending: true
            }
        case GET_REMINDERS_SUCCESS:
            return {
                ...state,
                getRemindersPending: false,
                getRemindersFailure: false,
                reminders: action.reminders
            }
        case GET_REMINDERS_FAILURE:
            return {
                ...state,
                getRemindersPending: false,
                getRemindersFailure: true
            }

        default:
            return state;
    }
}

//ACTION CREATORS
// GET REMINDER
function getReminderRequest() {
    return {type: GET_REMINDER_REQUEST}
}
function getReminderSuccess(reminder) {
    return {
        type: GET_REMINDER_SUCCESS,
        reminder: reminder
    }
}
function getReminderFailure() {
    return {type: GET_REMINDER_FAILURE}
}

// CREATE REMINDER
function createReminderRequest() {
    return {type: CREATE_REMINDER_REQUEST}
}
function createReminderSuccess(event) {
    return {
        type: CREATE_REMINDER_SUCCESS
    }
}
function createReminderFailure() {
    return {type: CREATE_REMINDER_FAILURE}
}

// UPDATE REMINDER
function updateReminderRequest() {
    return {type: UPDATE_REMINDER_REQUEST}
}
function updateReminderSuccess(event) {
    return {
        type: UPDATE_REMINDER_SUCCESS
    }
}
function updateReminderFailure() {
    return {type: UPDATE_REMINDER_FAILURE}
}

//DELETE REMINDER
function deleteReminderRequest() {
    return {type: DELETE_REMINDER_REQUEST}
}
function deleteReminderSuccess(events) {
    return {
        type: DELETE_REMINDER_SUCCESS
    }
}
function deleteReminderFailure() {
    return {type: DELETE_REMINDER_FAILURE}
}

//GET REMINDERS
function getRemindersRequest() {
    return {type: GET_REMINDERS_REQUEST}
}
function getRemindersSuccess(reminders) {
    return {
        type: GET_REMINDERS_SUCCESS,
        reminders: reminders
    }
}
function getRemindersFailure() {
    return {type: GET_REMINDERS_FAILURE}
}


//SIDE EFFECTS
export function initiateGetReminder(event) {
    return function getReminder(dispatch, getState) {
        dispatch(getReminderRequest())

        requestReminder(getState().user.token, event).then(response => {

            if (!response.ok) {
                dispatch(getReminderFailure())
                return
            }

            response.json().then(json => {
                if (!json.reminder) {
                    console.log('getReminderFailure')
                    dispatch(getReminderFailure())
                }

                dispatch(getReminderSuccess(json.reminder))
            }, () => dispatch(getReminderFailure))
        }, () => dispatch(getReminderFailure))
    }
}

export function initiateCreateReminder(event) {
    return function createReminderDispatcher(dispatch, getState) {
        dispatch(createReminderRequest())
        createReminder(getState().user.token, event).then(response => {
            console.log(`response from createReminder = ${response}`)
            if (!response.ok) {
                dispatch(createReminderFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getRemindersFailure')
                    dispatch(createReminderFailure())
                    return
                }

                if (json.message !== 'Reminder Created') {
                    console.log('createReminderFailure')
                    dispatch(createReminderFailure())
                    return
                }

                dispatch(createReminderSuccess())
                dispatch(initiateGetReminders())
            }, () => dispatch(createReminderFailure()))
        }, () => dispatch(createReminderFailure()))
    }
}

export function initiateUpdateReminder(event) {
    return function updateReminderDispatcher(dispatch, getState) {
        dispatch(updateReminderRequest())
        updateReminder(getState().user.token, event).then(response => {
            console.log(`response from updateReminder = ${response}`)
            if (!response.ok) {
                dispatch(updateReminderFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getRemindersFailure')
                    dispatch(updateReminderFailure())
                    return
                }

                if (json.message !== 'Reminder Updated') {
                    console.log('updateReminderFailure')
                    dispatch(updateReminderFailure())
                    return
                }

                dispatch(updateReminderSuccess())
                dispatch(initiateGetReminders())
            }, () => dispatch(updateReminderFailure()))
        }, () => dispatch(updateReminderFailure()))
    }
}

export function initiateDeleteReminder(event) {
    return function deleteReminderDispatcher(dispatch, getState) {
        dispatch(deleteReminderRequest())
        deleteReminder(getState().user.token, event).then(response => {
            console.log(response);
            if (!response.ok) {
                console.log('response was not ok')
                dispatch(deleteReminderFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getRemindersFailure')
                    dispatch(deleteReminderFailure())
                }

                if (json.message !== 'Reminder Deleted') {
                    console.log('deleteReminderFailure')
                    dispatch(deleteReminderFailure())
                }
                dispatch(deleteReminderSuccess())
                dispatch(initiateGetReminders())
            }, () => dispatch(deleteReminderFailure()))
        }, () => dispatch(deleteReminderFailure()))
    }
}

export function initiateGetReminders(event) {
    return function getReminders(dispatch, getState) {
        dispatch(getRemindersRequest())

        requestReminders(getState().user.token, event).then(response => {

            if (!response.ok) {
                dispatch(getRemindersFailure())
                return
            }

            response.json().then(json => {
                if (!json.reminders) {
                    console.log('getRemindersFailure')
                    dispatch(getRemindersFailure())
                }

                dispatch(getRemindersSuccess(json.reminders))
            }, () => dispatch(getRemindersFailure))
        }, () => dispatch(getRemindersFailure))
    }
}
