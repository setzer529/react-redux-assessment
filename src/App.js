import logo from './calamander_logo.png'
import {Container, Row, Col} from 'react-bootstrap';
import Login from './components/Login.js';
import Events from './components/Events.js';
import Reminders from './components/Reminders.js';
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


function App({
                 dispatch,
                 loginPending, loginFailure,
                 createUserPending, createUserFailed, token,
                 event, events,
                 reminder, reminders,
                 getEventsPending, getEventsFailure,
                 createEventPending, createEventFailure,
                 deleteEventPending, deleteEventFailure,
                 getRemindersPending, getRemindersFailure,
                 createReminderPending, createReminderFailure,
                 deleteReminderPending, deleteReminderFailure
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
                    />
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
    return {...state.user, ...state.events, ...state.reminders}
}

export default connect(mapStateToProps)(App);
