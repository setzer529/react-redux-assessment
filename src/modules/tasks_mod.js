import {requestTask, createTask, updateTask, deleteTask, requestTasks,} from '../Services/tasks_svc.js'

//ACTIONS
const GET_TASK_REQUEST = 'task/TASK/GET_TASK_REQUEST';
const GET_TASK_SUCCESS = 'task/TASK/GET_TASK_SUCCESS';
const GET_TASK_FAILURE = 'task/TASK/GET_TASK_FAILURE';

const CREATE_TASK_REQUEST = 'tasks/TASKS/CREATE_TASK_REQUEST';
const CREATE_TASK_SUCCESS = 'tasks/TASKS/CREATE_TASK_SUCCESS';
const CREATE_TASK_FAILURE = 'tasks/TASKS/CREATE_TASK_FAILURE';

const UPDATE_TASK_REQUEST = 'tasks/TASKS/UPDATE_TASK_REQUEST';
const UPDATE_TASK_SUCCESS = 'tasks/TASKS/UPDATE_TASK_SUCCESS';
const UPDATE_TASK_FAILURE = 'tasks/TASKS/UPDATE_TASK_FAILURE';

const DELETE_TASK_REQUEST = 'tasks/TASKS/DELETE_TASK_REQUEST';
const DELETE_TASK_SUCCESS = 'tasks/TASKS/DELETE_TASK_SUCCESS';
const DELETE_TASK_FAILURE = 'tasks/TASKS/DELETE_TASK_FAILURE';

const GET_TASKS_REQUEST = 'tasks/TASKS/GET_TASKS_REQUEST';
const GET_TASKS_SUCCESS = 'tasks/TASKS/GET_TASKS_SUCCESS';
const GET_TASKS_FAILURE = 'tasks/TASKS/GET_TASKS_FAILURE';

//REDUCER
const initialState = {
    getTaskPending: false,
    getTaskFailure: false,
    createTaskPending: false,
    createTaskFailure: false,
    updateTaskPending: false,
    updateTaskFailure: false,
    deleteTaskPending: false,
    deleteTaskFailure: false,
    getTasksPending: false,
    getTasksFailure: false,
    task: '',
    tasks: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASK_REQUEST:
            return {
                ...state,
                getTaskPending: true
            }

        case GET_TASK_SUCCESS:
            return {
                ...state,
                getTaskPending: false,
                getTaskFailure: false,
                task: action.task
            }

        case GET_TASK_FAILURE:
            return {
                ...state,
                getTaskPending: false,
                getTaskFailure: true
            }

        case CREATE_TASK_REQUEST:
            return {
                ...state,
                createTaskPending: true
            }
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                createTaskPending: false,
                createTaskFailure: false,
            }
        case CREATE_TASK_FAILURE:
            return {
                ...state,
                createTaskPending: false,
                createTaskFailure: true
            }

        case UPDATE_TASK_REQUEST:
            return {
                ...state,
                updateTaskPending: true
            }
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                updateTaskPending: false,
                updateTaskFailure: false,
            }
        case UPDATE_TASK_FAILURE:
            return {
                ...state,
                updateTaskPending: false,
                updateTaskFailure: true
            }

        case DELETE_TASK_REQUEST:
            return {
                ...state,
                deleteTaskPending: true,
                deleteTaskFailure: false
            }
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                deleteTaskPending: false,
                deleteTaskFailure: false,
            }
        case DELETE_TASK_FAILURE:
            return {
                ...state,
                deleteTaskPending: false,
                deleteTaskFailure: true
            }

        case GET_TASKS_REQUEST:
            return {
                ...state,
                getTasksPending: true
            }
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                getTasksPending: false,
                getTasksFailure: false,
                tasks: action.tasks
            }
        case GET_TASKS_FAILURE:
            return {
                ...state,
                getTasksPending: false,
                getTasksFailure: true
            }

        default:
            return state;
    }
}

//ACTION CREATORS
// GET TASK
function getTaskRequest() {
    return {type: GET_TASK_REQUEST}
}
function getTaskSuccess(task) {
    return {
        type: GET_TASK_SUCCESS,
        task: task
    }
}
function getTaskFailure() {
    return {type: GET_TASK_FAILURE}
}

// CREATE TASK
function createTaskRequest() {
    return {type: CREATE_TASK_REQUEST}
}
function createTaskSuccess(event) {
    return {
        type: CREATE_TASK_SUCCESS
    }
}
function createTaskFailure() {
    return {type: CREATE_TASK_FAILURE}
}

// UPDATE TASK
function updateTaskRequest() {
    return {type: UPDATE_TASK_REQUEST}
}
function updateTaskSuccess(event) {
    return {
        type: UPDATE_TASK_SUCCESS
    }
}
function updateTaskFailure() {
    return {type: UPDATE_TASK_FAILURE}
}

//DELETE TASK
function deleteTaskRequest() {
    return {type: DELETE_TASK_REQUEST}
}
function deleteTaskSuccess(events) {
    return {
        type: DELETE_TASK_SUCCESS
    }
}
function deleteTaskFailure() {
    return {type: DELETE_TASK_FAILURE}
}

//GET TASKS
function getTasksRequest() {
    return {type: GET_TASKS_REQUEST}
}
function getTasksSuccess(tasks) {
    return {
        type: GET_TASKS_SUCCESS,
        tasks: tasks
    }
}
function getTasksFailure() {
    return {type: GET_TASKS_FAILURE}
}


//SIDE EFFECTS
export function initiateGetTask(event) {
    return function getTask(dispatch, getState) {
        dispatch(getTaskRequest())

        requestTask(getState().user.token, event).then(response => {

            if (!response.ok) {
                dispatch(getTaskFailure())
                return
            }

            response.json().then(json => {
                if (!json.task) {
                    console.log('getTaskFailure')
                    dispatch(getTaskFailure())
                }

                dispatch(getTaskSuccess(json.task))
            }, () => dispatch(getTaskFailure))
        }, () => dispatch(getTaskFailure))
    }
}

export function initiateCreateTask(event) {
    console.log(`event at initiate Create Task: ${event}`)
    return function createTaskDispatcher(dispatch, getState) {
        dispatch(createTaskRequest())
        createTask(getState().user.token, event).then(response => {
            console.log(`response from createTask = ${response}`)
            if (!response.ok) {
                dispatch(createTaskFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getTasksFailure')
                    dispatch(createTaskFailure())
                    return
                }

                if (json.message !== 'Task Created') {
                    console.log('createTaskFailure')
                    dispatch(createTaskFailure())
                    return
                }

                dispatch(createTaskSuccess())
                dispatch(initiateGetTasks())
            }, () => dispatch(createTaskFailure()))
        }, () => dispatch(createTaskFailure()))
    }
}

export function initiateUpdateTask(event) {
    return function updateTaskDispatcher(dispatch, getState) {
        dispatch(updateTaskRequest())
        updateTask(getState().user.token, event).then(response => {
            console.log(`response from updateTask = ${response}`)
            if (!response.ok) {
                dispatch(updateTaskFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getTasksFailure')
                    dispatch(updateTaskFailure())
                    return
                }

                if (json.message !== 'Task Updated') {
                    console.log('updateTaskFailure')
                    dispatch(updateTaskFailure())
                    return
                }

                dispatch(updateTaskSuccess())
                dispatch(initiateGetTasks())
            }, () => dispatch(updateTaskFailure()))
        }, () => dispatch(updateTaskFailure()))
    }
}

export function initiateDeleteTask(event) {
    return function deleteTaskDispatcher(dispatch, getState) {
        dispatch(deleteTaskRequest())
        deleteTask(getState().user.token, event).then(response => {
            console.log(response);
            if (!response.ok) {
                console.log('response was not ok')
                dispatch(deleteTaskFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    console.log('getTasksFailure')
                    dispatch(deleteTaskFailure())
                }

                if (json.message !== 'Task Deleted') {
                    console.log('deleteTaskFailure')
                    dispatch(deleteTaskFailure())
                }
                dispatch(deleteTaskSuccess())
                dispatch(initiateGetTasks())
            }, () => dispatch(deleteTaskFailure()))
        }, () => dispatch(deleteTaskFailure()))
    }
}

export function initiateGetTasks(event) {
    return function getTasks(dispatch, getState) {
        dispatch(getTasksRequest())

        requestTasks(getState().user.token, event).then(response => {

            if (!response.ok) {
                dispatch(getTasksFailure())
                return
            }

            response.json().then(json => {
                if (!json.tasks) {
                    console.log('getTasksFailure')
                    dispatch(getTasksFailure())
                }

                dispatch(getTasksSuccess(json.tasks))
            }, () => dispatch(getTasksFailure))
        }, () => dispatch(getTasksFailure))
    }
}
