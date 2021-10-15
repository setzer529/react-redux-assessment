import {
    Badge,
    Button,
    Col,
    Row,
    Card,
    Modal,
    Form,
    Toast,
    ToastContainer,
} from 'react-bootstrap';
import {useState, useEffect} from 'react'

function Events({
                    event,
                    events,
                    handleLogoutRequest,
                    handleCreateEvent,
                    handleUpdateEvent,
                    handleDeleteEvent,
                    handleGetEvent,
                    handleGetEvents,
                    getEventsPending,
                    getEventsFailure,
                    createEventPending,
                    createEventFailure,
                    deleteEventFailure,
                    getEventPending,
                    getEventFailure,
                    updateEventPending,
                    updateEventFailure

                }) {
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);
    const [eventID, setEventID] = useState('')
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventAttendees, setEventAttendees] = useState([]);
    const [eventLink, setEventLink] = useState('');
    const [showGetEventsError, setShowGetEventsError] = useState(false);
    const [showCreateEventError, setShowCreateEventError] = useState(false);
    const [showDeleteEventError, setShowDeleteEventError] = useState(false);
    const [showGetEventError, setShowGetEventError] = useState(false);
    const [showUpdateEventError, setShowUpdateEventError] = useState(false);
    const [eventsRange, setEventsRange] = useState(defaultDate());
    const [eventUpdate, setEventUpdate] = useState(false);

    function handleEventSubmit(event) {
        event.preventDefault()
        let attendees = eventAttendees[0] ? eventAttendees.split(',') : []
        const request = {
            title: eventTitle,
            description: eventDescription,
            location: eventLocation,
            meeting_link: eventLink,
            attendee_list: attendees,
            start_timestamp: eventStartDate,
            end_timestamp: eventEndDate

        }

        if (eventUpdate) {
            request.id = eventID
        }

        console.log(eventUpdate)
        console.log(eventUpdate ? true : false)
        eventUpdate ? handleUpdateEvent(request) : handleCreateEvent(request);
        eventUpdate ? handleCloseDetail() : handleCloseCreate();
    }

    function handleEventUpdate(update) {
        update.preventDefault()

    }

    function handleEventCreate(input) {
        setEventUpdate(false);
        console.log(eventUpdate)
        setEventID('');
        setEventTitle('');
        setEventDescription('');
        setEventLocation('');
        setEventLink('');
        setEventAttendees([]);
        setEventStartTime('');
        setEventStartDate('');
        setEventEndTime('');
        setEventEndDate('');
        handleShowCreate();
    }

    async function handleEventDetail(input) {
        setEventUpdate(true);
        console.log(eventUpdate);
        await handleGetEvent(input);
        handleShowDetail();
    }

    useEffect(() => {
        if (getEventsFailure) {
            setShowGetEventsError(true)
        }
        if (createEventFailure) {
            setShowCreateEventError(true)
        }
        if (deleteEventFailure) {
            setShowDeleteEventError(true)
        }
        if (getEventFailure) {
            setShowGetEventError(true)
        }
        if (updateEventFailure) {
            setShowUpdateEventError(true)
        }


    }, [getEventsFailure, createEventFailure, deleteEventFailure, getEventFailure, updateEventFailure])

    useEffect(() => {
        // console.log(`locale string: ${event.start_timestamp ? event.start_timestamp.toLocaleString(): event.start_timestamp}`)
        setEventID(event.id)
        setEventTitle(event.title);
        setEventDescription(event.description);
        setEventLocation(event.location);
        setEventLink(event.meeting_link);
        setEventAttendees(event.attendee_list ? event.attendee_list : []);
        setEventStartDate(event.start_timestamp ? event.start_timestamp.toLocaleString() : event.start_timestamp);
        setEventEndDate(event.end_timestamp ? event.end_timestamp.toLocaleString() : event.end_timestamp);
    }, [event])

    function handleTitleChange(event) {
        setEventTitle(event.target.value)
    }
    function handleDescriptionChange(event) {
        setEventDescription(event.target.value)
    }
    function handleLocationChange(event) {
        setEventLocation(event.target.value)
    }
    function handleLinkChange(event) {
        setEventLink(event.target.value)
    }
    function handleAttendeesChange(event) {
        setEventAttendees(event.target.value);
    }
    function handleStartDateChange(event) {
        setEventStartDate(event.target.value)
    }
    function handleEndDateChange(event) {
        setEventEndDate(event.target.value)
    }
    function handleStartChange(event) {
        setEventsRange({...eventsRange, range_start: new Date(event.target.value)});
    }
    function handleEndChange(event) {
        setEventsRange({...eventsRange, range_end: new Date(event.target.value)});
    }
    function handleFilter(event) {
        event.preventDefault();
        handleGetEvents({eventsRange})
        ;
    }

    function defaultDate() {
        let range_start = new Date();
        range_start.setHours(0, 0, 0, 0)
        let range_end = new Date();
        range_end.setDate(range_end.getDate() + 7);
        range_end.setHours(59, 59, 59, 99)
        return {
            range_start: range_start,
            range_end: range_end
        }
    }

    return (
        <>
            {/*CREATE EVENT MODAL*/}
            <Modal show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEventSubmit}>
                        <Form.Group className="mb-2" controlId="createTitle">
                            <Form.Label>Event Title:</Form.Label>
                            <Form.Control type="text" placeholder="Title" onChange={handleTitleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createDescription">
                            <Form.Label>Description: </Form.Label>
                            <Form.Control type="text" placeholder="Description" onChange={handleDescriptionChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createLocation">
                            <Form.Label>Location: </Form.Label>
                            <Form.Control type="text" placeholder="Location" onChange={handleLocationChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createLink">
                            <Form.Label>Link: </Form.Label>
                            <Form.Control type="text" placeholder="HTML Link" onChange={handleLinkChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createStart">
                            <Form.Label>Start Date/Time: </Form.Label>
                            <Form.Control type="datetime-local" onChange={handleStartDateChange}/>
                            {/*<Form.Control type="time" onChange={handleStartTimeChange}/>*/}
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createEnd">
                            <Form.Label>End Date/Time: </Form.Label>
                            <Form.Control type="datetime-local" onChange={handleEndDateChange}/>
                            {/*<Form.Control type="time" onChange={handleEndTimeChange}/>*/}
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createAttendees">
                            <Form.Label>Attendees: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username 1, Username 2"
                                onChange={handleAttendeesChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {/*DETAIL & EDIT EVENT MODAL*/}
            <Modal show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEventSubmit}>
                        <Form.Group className="mb-2" controlId="createTitle">
                            <Form.Label>Event Title:</Form.Label>
                            <Form.Control type="text" placeholder="Title" defaultValue={eventTitle}
                                          onChange={handleTitleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createDescription">
                            <Form.Label>Description: </Form.Label>
                            <Form.Control type="text" placeholder="Description" defaultValue={eventDescription}
                                          onChange={handleDescriptionChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createLocation">
                            <Form.Label>Location: </Form.Label>
                            <Form.Control type="text" placeholder="Location" defaultValue={eventLocation}
                                          onChange={handleLocationChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createLink">
                            <Form.Label>Link: </Form.Label>
                            <Form.Control type="text" placeholder="HTML Link" defaultValue={eventLink}
                                          onChange={handleLinkChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createStart">
                            <Form.Label>Start Date/Time: {eventStartDate}</Form.Label>
                            <Form.Control type="datetime-local"
                                          onChange={handleStartDateChange}/>
                            {/*<Form.Control type="time"*/}
                            {/*              onChange={handleStartTimeChange}/>*/}
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createEnd">
                            <Form.Label>End Date/Time: {eventEndDate}</Form.Label>
                            <Form.Control type="datetime-local"
                                          onChange={handleEndDateChange}/>
                            {/*<Form.Control type="time"*/}
                            {/*              onChange={handleEndTimeChange}/>*/}
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createAttendees">
                            <Form.Label>Attendees: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username 1, Username 2"
                                defaultValue={eventAttendees}
                                onChange={handleAttendeesChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Event
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {/*YOUR EVENTS*/}
            <Row className='bg-danger'>
                <Col><h1>YOUR EVENTS</h1></Col>
                <Col xs='auto'>
                    <Button onClick={() => handleEventCreate()}>Create Event</Button>
                </Col>
                <Col xs='auto'>
                    <Button variant='outline-primary' onClick={handleLogoutRequest}>Logout</Button>
                </Col>
            </Row>
            {/*//DATE FILTER*/}
            <Row className='bg-danger'>
                <Form onSubmit={handleFilter}>
                    <Col>
                        <Form.Group className="mb-3" controlId="startDate">
                            <Form.Label>Start:</Form.Label>
                            <Form.Control type="date" onChange={handleStartChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="endDate">
                            <Form.Label>End:</Form.Label>
                            <Form.Control type="date" onChange={handleEndChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button className={"m-2"} variant="primary" type="submit">
                            Filter
                        </Button>
                    </Col>
                </Form>
            </Row>
            {/*//ABBREVIATED EVENTS*/}
            <Row>
                {events ? events.map(event => {
                        return (
                            <Col xs={4} key={event.id}>
                                <Card className={"my-3"}>
                                    <Card.Header>
                                        <Button className={"m-2"} onClick={() => handleEventDetail(event)}>Detail</Button>
                                        <Button className={"m-2"} onClick={() => handleDeleteEvent(event)}>Delete</Button>
                                    </Card.Header>
                                    <Card.Body>
                                        <h4 >{event.title}</h4>
                                        <Card.Subtitle>
                                            <div>Start Time: {event.start_timestamp ?
                                            event.start_timestamp.slice(0, 16).replace('T', ' ') :
                                            'not set'}
                                            </div>
                                            <div>
                                            End Time: {event.end_timestamp ?
                                            event.end_timestamp.slice(0, 16).replace('T', ' ') :
                                            'not set'}
                                            </div>
                                        </Card.Subtitle>

                                    </Card.Body>
                                    <Card.Footer>
                                        {event.attendees ? event.attendees.map(attendee => {
                                            return (
                                                <Badge className={'m-2'} key={`${event.id}:${attendee}`}>{attendee}</Badge>)
                                        }) : <Badge className={'m-2'} key={event.id + 'none'}>No Attendees</Badge>}
                                    </Card.Footer>
                                </Card>
                            </Col>)
                    }) :
                    <h2>Loading...</h2>
                }
            </Row>
            {/*//ERROR ALERTS*/}
            <ToastContainer className={"p-3"} position={'bottom-end'}>
                <Toast bg='danger' onClose={() => setShowGetEventsError(false)} show={showGetEventsError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Retrieve Events</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowCreateEventError(false)} show={showCreateEventError}
                       delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Create Event</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowDeleteEventError(false)} show={showDeleteEventError}
                       delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Delete Event</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowGetEventError(false)} show={showGetEventError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Retrieve Event</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowUpdateEventError(false)} show={showUpdateEventError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Update Event</b></Toast.Body>
                </Toast>
            </ToastContainer>

            {/*{createEventPending && <LoadingEvent/>}*/}
        </>
    );
}

export default Events;
//todo
// <Card style={{width: '18rem'}}>
//     <Card.Body>
//         <Placeholder as={Card.Title} animation="glow">
//             <Placeholder xs={6}/>
//         </Placeholder>
//         <Placeholder as={Card.Text} animation="glow">
//             <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
//             <Placeholder xs={6}/> <Placeholder xs={8}/>
//         </Placeholder>
//     </Card.Body>
//     <Card.Footer className="text-muted">FOOTER</Card.Footer>
// </Card>