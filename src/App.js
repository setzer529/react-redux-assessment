import logo from './calamander_logo.png'
import {Container, Row, Col} from 'react-bootstrap';
import Login from './components/Login.js';
import Events from './components/Events.js';
import Reminders from './components/Reminders.js';
import Tasks from './components/Tasks.js';
import Invites from './components/Invites.js';
import {connect} from 'react-redux';
import {
    initiateLogin, logout
} from './modules/login_mod.js';
import {
    initiateCreateEvent, initiateUpdateEvent, initiateDeleteEvent, initiateGetEvent, initiateGetEvents
} from './modules/events_mod.js';
import {
    initiateCreateReminder, initiateUpdateReminder, initiateDeleteReminder, initiateGetReminder, initiateGetReminders
} from './modules/reminders_mod.js';
import {
    initiateCreateTask, initiateUpdateTask, initiateDeleteTask, initiateGetTask, initiateGetTasks
} from './modules/tasks_mod.js';
import {
    initiateCreateInvite, initiateUpdateInvite, initiateDeleteInvite, initiateGetInvite, initiateGetInvites
} from './modules/invites_mod.js';


function App({
                 dispatch,
                 loginPending, loginFailure,
                 createUserPending, createUserFailed, token,
                 event, events,
                 reminder, reminders,
                 task, tasks,
                 invite, invites,
                 getEventsPending, getEventsFailure,
                 createEventPending, createEventFailure,
                 deleteEventPending, deleteEventFailure,
                 getEventPending, getEventFailure,
                 updateEventPending, updateEventFailure,
                 getRemindersPending, getRemindersFailure,
                 createReminderPending, createReminderFailure,
                 deleteReminderPending, deleteReminderFailure,
                 getReminderPending, getReminderFailure,
                 updateReminderPending, updateReminderFailure,
                 getTasksPending, getTasksFailure,
                 createTaskPending, createTaskFailure,
                 deleteTaskPending, deleteTaskFailure,
                 getTaskPending, getTaskFailure,
                 updateTaskPending, updateTaskFailure,
                 getInvitesPending, getInvitesFailure,
                 createInvitePending, createInviteFailure,
                 deleteInvitePending, deleteInviteFailure,
                 getInvitePending, getInviteFailure,
                 updateInvitePending, updateInviteFailure
             }) {

    return (
        <Container fluid>
            <Row className='bg-primary h-100 align-items-center justify-content-left mb-2 flex'>
                <Col>
                    <img src={logo} alt="logo" className='h-75'/>
                </Col>
                <Col className="d-flex align-text-middle justify-content-left display-2 text-secondary">CALAMANDER</Col>
                <Col></Col>
            </Row>
            {token ?
                <>
                    <Events
                        event={event}
                        events={events}
                        handleLogoutRequest={() => dispatch(logout())}
                        handleCreateEvent={event => dispatch(initiateCreateEvent(event))}
                        handleUpdateEvent={event => dispatch(initiateUpdateEvent(event))}
                        handleDeleteEvent={event => dispatch(initiateDeleteEvent(event))}
                        handleGetEvent={event => dispatch(initiateGetEvent(event))}
                        handleGetEvents={event => dispatch(initiateGetEvents(event.eventsRange))}
                        getEventsPending={getEventsPending}
                        getEventsFailure={getEventsFailure}
                        createEventPending={createEventPending}
                        createEventFailure={createEventFailure}
                        deleteEventPending={deleteEventPending}
                        deleteEventFailure={deleteEventFailure}
                        getEventPending={getEventPending}
                        getEventFailure={getEventFailure}
                        updateEventPending={updateEventPending}
                        updateEventFailure={updateEventFailure}


                    />
                    <Reminders
                        reminder={reminder}
                        reminders={reminders}
                        handleLogoutRequest={() => dispatch(logout())}
                        handleCreateReminder={reminder => dispatch(initiateCreateReminder(reminder))}
                        handleUpdateReminder={reminder => dispatch(initiateUpdateReminder(reminder))}
                        handleDeleteReminder={reminder => dispatch(initiateDeleteReminder(reminder))}
                        handleGetReminder={reminder => dispatch(initiateGetReminder(reminder))}
                        handleGetReminders={reminder => dispatch(initiateGetReminders(reminder.remindersRange))}
                        getRemindersPending={getRemindersPending}
                        getRemindersFailure={getRemindersFailure}
                        createReminderPending={createReminderPending}
                        createReminderFailure={createReminderFailure}
                        deleteReminderPending={deleteReminderPending}
                        deleteReminderFailure={deleteReminderFailure}
                        getReminderPending={getReminderPending}
                        getReminderFailure={getReminderFailure}
                        updateReminderPending={updateReminderPending}
                        updateReminderFailure={updateReminderFailure}
                    />
                    <Tasks
                        task={task}
                        tasks={tasks}
                        handleLogoutRequest={() => dispatch(logout())}
                        handleCreateTask={task => dispatch(initiateCreateTask(task))}
                        handleUpdateTask={task => dispatch(initiateUpdateTask(task))}
                        handleDeleteTask={task => dispatch(initiateDeleteTask(task))}
                        handleGetTask={task => dispatch(initiateGetTask(task))}
                        handleGetTasks={task => dispatch(initiateGetTasks(task.tasksRange))}
                        getTasksPending={getTasksPending}
                        getTasksFailure={getTasksFailure}
                        createTaskPending={createTaskPending}
                        createTaskFailure={createTaskFailure}
                        deleteTaskPending={deleteTaskPending}
                        deleteTaskFailure={deleteTaskFailure}
                        getTaskPending={getTaskPending}
                        getTaskFailure={getTaskFailure}
                        updateTaskPending={updateTaskPending}
                        updateTaskFailure={updateTaskFailure}
                    />
                    {/*<Invites*/}
                    {/*    invite={invite}*/}
                    {/*    invites={invites}*/}
                    {/*    handleLogoutRequest={() => dispatch(logout())}*/}
                    {/*    handleCreateInvite={invite => dispatch(initiateCreateInvite(invite))}*/}
                    {/*    handleUpdateInvite={invite => dispatch(initiateUpdateInvite(invite))}*/}
                    {/*    handleDeleteInvite={invite => dispatch(initiateDeleteInvite(invite))}*/}
                    {/*    handleGetInvite={invite => dispatch(initiateGetInvite(invite))}*/}
                    {/*    handleGetInvites={invite => dispatch(initiateGetInvites(invite.invitesRange))}*/}
                    {/*    getInvitesPending={getInvitesPending}*/}
                    {/*    getInvitesFailure={getInvitesFailure}*/}
                    {/*    createInvitePending={createInvitePending}*/}
                    {/*    createInviteFailure={createInviteFailure}*/}
                    {/*    deleteInvitePending={deleteInvitePending}*/}
                    {/*    deleteInviteFailure={deleteInviteFailure}*/}
                    {/*    getInvitePending={getInvitePending}*/}
                    {/*    getInviteFailure={getInviteFailure}*/}
                    {/*    updateInvitePending={updateInvitePending}*/}
                    {/*    updateInviteFailure={updateInviteFailure}*/}
                    {/*/>*/}
                </> :
                <Login
                    handleLoginRequest={(username, password, newUser) => dispatch(initiateLogin({
                        username,
                        password,
                        newUser
                    }))}
                    loginFailure={loginFailure}
                    loginPending={loginPending}
                    createUserPending={createUserPending}
                    createUserFailed={createUserFailed}
                />
            }

        </Container>
    );
}

function mapStateToProps(state) {
    return {...state.user, ...state.events, ...state.reminders, ...state.tasks, ...state.invites}
}

export default connect(mapStateToProps)(App);
