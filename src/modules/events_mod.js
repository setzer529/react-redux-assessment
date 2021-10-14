import {requestEvent, createEvent, updateEvent, deleteEvent, requestEvents,} from '../Services/events_svc.js'


//ACTIONS
const GET_EVENT_REQUEST = 'event/EVENT/GET_EVENT_REQUEST';
const GET_EVENT_SUCCESS = 'event/EVENT/GET_EVENT_SUCCESS';
const GET_EVENT_FAILURE = 'event/EVENT/GET_EVENT_FAILURE';

const CREATE_EVENT_REQUEST = 'events/EVENTS/CREATE_EVENT_REQUEST';
const CREATE_EVENT_SUCCESS = 'events/EVENTS/CREATE_EVENT_SUCCESS';
const CREATE_EVENT_FAILURE = 'events/EVENTS/CREATE_EVENT_FAILURE';

const UPDATE_EVENT_REQUEST = 'events/EVENTS/UPDATE_EVENT_REQUEST';
const UPDATE_EVENT_SUCCESS = 'events/EVENTS/UPDATE_EVENT_SUCCESS';
const UPDATE_EVENT_FAILURE = 'events/EVENTS/UPDATE_EVENT_FAILURE';

const DELETE_EVENT_REQUEST = 'events/EVENTS/DELETE_EVENT_REQUEST';
const DELETE_EVENT_SUCCESS = 'events/EVENTS/DELETE_EVENT_SUCCESS';
const DELETE_EVENT_FAILURE = 'events/EVENTS/DELETE_EVENT_FAILURE';

const GET_EVENTS_REQUEST = 'events/EVENTS/GET_EVENTS_REQUEST';
const GET_EVENTS_SUCCESS = 'events/EVENTS/GET_EVENTS_SUCCESS';
const GET_EVENTS_FAILURE = 'events/EVENTS/GET_EVENTS_FAILURE';

//todo totes sus VVV
// const LOGOUT = 'calendar/user/LOGOUT';

//REDUCER
const initialState = {
    getEventPending: false,
    getEventFailure: false,
    createEventPending: false,
    createEventFailure: false,
    updateEventPending: false,
    updateEventFailure: false,
    deleteEventPending: false,
    deleteEventFailure: false,
    getEventsPending: false,
    getEventsFailure: false,
    event: '',
    events: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_EVENT_REQUEST:
            return {
                ...state,
                getEventPending: true
            }

        case GET_EVENT_SUCCESS:
            return {
                ...state,
                getEventPending: false,
                getEventFailure: false,
                event: action.event
            }

        case GET_EVENT_FAILURE:
            return {
                ...state,
                getEventPending: false,
                getEventFailure: true
            }

        case CREATE_EVENT_REQUEST:
            return {
                ...state,
                createEventPending: true
            }
        case CREATE_EVENT_SUCCESS:
            return {
                ...state,
                createEventPending: false,
                createEventFailure: false,
            }
        case CREATE_EVENT_FAILURE:
            return {
                ...state,
                createEventPending: false,
                createEventFailure: true
            }

        case UPDATE_EVENT_REQUEST:
            return {
                ...state,
                updateEventPending: true
            }
        case UPDATE_EVENT_SUCCESS:
            return {
                ...state,
                updateEventPending: false,
                updateEventFailure: false,
            }
        case UPDATE_EVENT_FAILURE:
            return {
                ...state,
                updateEventPending: false,
                updateEventFailure: true
            }

        case DELETE_EVENT_REQUEST:
            return {
                ...state,
                deleteEventPending: true,
                deleteEventFailure: false
            }
        case DELETE_EVENT_SUCCESS:
            return {
                ...state,
                deleteEventPending: false,
                deleteEventFailure: false,
            }
        case DELETE_EVENT_FAILURE:
            console.log('delete event failure')
            return {
                ...state,
                deleteEventPending: false,
                deleteEventFailure: true
            }

        case GET_EVENTS_REQUEST:
            return {
                ...state,
                getEventsPending: true
            }
        case GET_EVENTS_SUCCESS:
            return {
                ...state,
                getEventsPending: false,
                getEventsFailure: false,
                events: action.events
            }
        case GET_EVENTS_FAILURE:
            return {
                ...state,
                getEventsPending: false,
                getEventsFailure: true
            }

        default:
            return state;
    }
}

//ACTION CREATORS
// GET EVENT
function getEventRequest() {
    return {type: GET_EVENT_REQUEST}
}
function getEventSuccess(event) {
    return {
        type: GET_EVENT_SUCCESS,
        event: event
    }
}
function getEventFailure() {
    return {type: GET_EVENT_FAILURE}
}

// CREATE EVENT
function createEventRequest() {
    return {type: CREATE_EVENT_REQUEST}
}
function createEventSuccess(event) {
    return {
        type: CREATE_EVENT_SUCCESS
    }
}
function createEventFailure() {
    return {type: CREATE_EVENT_FAILURE}
}

// UPDATE EVENT
function updateEventRequest() {
    return {type: UPDATE_EVENT_REQUEST}
}
function updateEventSuccess(event) {
    return {
        type: UPDATE_EVENT_SUCCESS
    }
}
function updateEventFailure() {
    return {type: UPDATE_EVENT_FAILURE}
}

//DELETE EVENT
function deleteEventRequest() {
    return {type: DELETE_EVENT_REQUEST}
}
function deleteEventSuccess(events) {
    return {
        type: DELETE_EVENT_SUCCESS
    }
}
function deleteEventFailure() {
    return {type: DELETE_EVENT_FAILURE}
}

//GET EVENTS
function getEventsRequest() {
    return {type: GET_EVENTS_REQUEST}
}
function getEventsSuccess(events) {
    return {
        type: GET_EVENTS_SUCCESS,
        events: events
    }
}
function getEventsFailure() {
    return {type: GET_EVENTS_FAILURE}
}


//SIDE EFFECTS
export function initiateGetEvent(event) {
    return function getEvent(dispatch, getState) {
        dispatch(getEventRequest())

        requestEvent(getState().user.token, event).then(response => {

            if (!response.ok) {
                dispatch(getEventFailure())
                return
            }

            response.json().then(json => {
                if (!json.event) {
                    console.log('getEventFailure')
                    dispatch(getEventFailure())
                }

                dispatch(getEventSuccess(json.event))
            }, () => dispatch(getEventFailure))
        }, () => dispatch(getEventFailure))
    }
}

export function initiateCreateEvent(event) {
    return function createEventDispatcher(dispatch, getState) {
        dispatch(createEventRequest())
        createEvent(getState().user.token, event).then(response => {
            console.log(`response from createEvent = ${response}`)
            if (!response.ok) {
                dispatch(createEventFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getEventsFailure')
                    dispatch(createEventFailure())
                    return
                }

                if (json.message !== 'Event Created') {
                    console.log('createEventFailure')
                    dispatch(createEventFailure())
                    return
                }

                dispatch(createEventSuccess())
                dispatch(initiateGetEvents())
            }, () => dispatch(createEventFailure()))
        }, () => dispatch(createEventFailure()))
    }
}

export function initiateUpdateEvent(event) {
    return function updateEventDispatcher(dispatch, getState) {
        dispatch(updateEventRequest())
        updateEvent(getState().user.token, event).then(response => {
            console.log(`response from updateEvent = ${response}`)
            if (!response.ok) {
                dispatch(updateEventFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getEventsFailure')
                    dispatch(updateEventFailure())
                    return
                }

                if (json.message !== 'Event Updated') {
                    console.log('updateEventFailure')
                    dispatch(updateEventFailure())
                    return
                }

                dispatch(updateEventSuccess())
                dispatch(initiateGetEvents())
            }, () => dispatch(updateEventFailure()))
        }, () => dispatch(updateEventFailure()))
    }
}

export function initiateDeleteEvent(event) {
    console.log(`event id = ${event.id}`)
    return function deleteEventDispatcher(dispatch, getState) {
        dispatch(deleteEventRequest())
        deleteEvent(getState().user.token, event).then(response => {
            console.log(response);
            if (!response.ok) {
                console.log('response was not ok')
                dispatch(deleteEventFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getEventsFailure')
                    dispatch(deleteEventFailure())
                }

                if (json.message !== 'Event Deleted') {
                    console.log('deleteEventFailure')
                    dispatch(deleteEventFailure())
                }
                dispatch(deleteEventSuccess())
                dispatch(initiateGetEvents())
            }, () => dispatch(deleteEventFailure()))
        }, () => dispatch(deleteEventFailure()))
    }
}

export function initiateGetEvents(event) {
    return function getEvents(dispatch, getState) {
        dispatch(getEventsRequest())

        requestEvents(getState().user.token, event).then(response => {

            if (!response.ok) {
                dispatch(getEventsFailure())
                return
            }

            response.json().then(json => {
                if (!json.abbr_events) {
                    console.log('getEventsFailure')
                    dispatch(getEventsFailure())
                }

                dispatch(getEventsSuccess(json.abbr_events))
            }, () => dispatch(getEventsFailure))
        }, () => dispatch(getEventsFailure))
    }
}
