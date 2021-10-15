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

function Reminders({
                       reminder,
                       reminders,
                       handleLogoutRequest,
                       handleCreateReminder,
                       handleUpdateReminder,
                       handleDeleteReminder,
                       handleGetReminder,
                       handleGetReminders,
                       getRemindersPending,
                       getRemindersFailure,
                       createReminderPending,
                       createReminderFailure,
                       deleteReminderFailure,
                       getReminderPending,
                       getReminderFailure,
                       updateReminderPending,
                       updateReminderFailure
                   }) {
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);
    const [reminderID, setReminderID] = useState('')
    const [reminderTitle, setReminderTitle] = useState('');
    const [reminderEventID, setReminderEventID] = useState('');
    const [reminderLocation, setReminderLocation] = useState('');
    const [reminderStartTime, setReminderStartTime] = useState('');
    const [reminderStartDate, setReminderStartDate] = useState('');
    const [reminderEndTime, setReminderEndTime] = useState('');
    const [reminderEndDate, setReminderEndDate] = useState('');
    const [reminderAttendees, setReminderAttendees] = useState([]);
    const [reminderLink, setReminderLink] = useState('');
    const [showGetRemindersError, setShowGetRemindersError] = useState(false);
    const [showCreateReminderError, setShowCreateReminderError] = useState(false);
    const [showDeleteReminderError, setShowDeleteReminderError] = useState(false);
    const [showGetReminderError, setShowGetReminderError] = useState(false);
    const [showUpdateReminderError, setShowUpdateReminderError] = useState(false);
    const [remindersRange, setRemindersRange] = useState(defaultDate());
    const [reminderUpdate, setReminderUpdate] = useState(false);

    function handleReminderSubmit(event) {
        event.preventDefault()
        const request = {
            title: reminderTitle,
            timestamp: reminderStartDate
        }
        if (event.event_id) {
            request.event_id = event.event_id
        }
        if (reminderUpdate) {
            request.id = reminderID
        }
        reminderUpdate ? handleUpdateReminder(request) : handleCreateReminder(request);
        reminderUpdate ? handleCloseDetail() : handleCloseCreate();
    }

    function handleReminderUpdate(update) {
        update.preventDefault()

    }

    function handleReminderCreate(input) {
        setReminderUpdate(false);
        setReminderID('');
        setReminderTitle('');
        setReminderEventID('');
        setReminderStartDate('');
        handleShowCreate();
    }

    async function handleReminderDetail(input) {
        setReminderUpdate(true);
        console.log(reminderUpdate);
        await handleGetReminder(input);
        handleShowDetail();
    }

    useEffect(() => {
        if (getRemindersFailure) {
            setShowGetRemindersError(true)
        }
        if (createReminderFailure) {
            setShowCreateReminderError(true)
        }
        if (deleteReminderFailure) {
            setShowDeleteReminderError(true)
        }
        if (getReminderFailure) {
            setShowGetReminderError(true)
        }
        if (updateReminderFailure) {
            setShowUpdateReminderError(true)
        }

    }, [getRemindersFailure, createReminderFailure, deleteReminderFailure, getReminderFailure, updateReminderFailure])

    useEffect(() => {
        setReminderID(reminder.id);
        setReminderEventID(reminder.event_id);
        setReminderTitle(reminder.title);
        setReminderStartDate(reminder.timestamp ? reminder.timestamp.toLocaleString() : reminder.timestamp);
    }, [reminder])

    function handleTitleChange(event) {
        setReminderTitle(event.target.value)
    }

    function handleStartDateChange(event) {
        setReminderStartDate(event.target.value)
    }

    function handleStartChange(event) {
        setRemindersRange({...remindersRange, range_start: new Date(event.target.value)});
    }

    function handleEndChange(event) {
        setRemindersRange({...remindersRange, range_end: new Date(event.target.value)});
    }

    function handleFilter(event) {
        event.preventDefault();
        handleGetReminders({remindersRange})
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
            {/*CREATE REMINDER MODAL*/}
            <Modal show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Reminder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleReminderSubmit}>
                        <Form.Group className="mb-2" controlId="createTitle">
                            <Form.Label>Reminder Title:</Form.Label>
                            <Form.Control type="text" placeholder="Title" onChange={handleTitleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createStart">
                            <Form.Label>Date/Time: </Form.Label>
                            <Form.Control type="datetime-local" onChange={handleStartDateChange}/>
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
                    <Modal.Title>Edit Reminder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleReminderSubmit}>
                        <Form.Group className="mb-2" controlId="createTitle">
                            <Form.Label>Reminder Title:</Form.Label>
                            <Form.Control type="text" placeholder="Title" defaultValue={reminderTitle}
                                          onChange={handleTitleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createStart">
                            <Form.Label>Start Time: {reminderStartDate}</Form.Label>
                            <Form.Control type="datetime-local" onChange={handleStartDateChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Reminder
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {/*YOUR EVENTS*/}
            <Row className='bg-danger'>
                <Col><h1>REMINDERS</h1></Col>
                <Col xs='auto'>
                    <Button onClick={() => handleReminderCreate()}>Create Reminder</Button>
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
            {/*//REMINDERS*/}
            <Row>
                {reminders ? reminders.map(reminder => {
                        return (
                            <Col xs={4} key={reminder.id}>
                                <Card className={"my-3"}>
                                    <Card.Header>
                                        <Button className={"m-2"}
                                                onClick={() => handleReminderDetail(reminder)}>Edit</Button>
                                        <Button className={"m-2"}
                                                onClick={() => handleDeleteReminder(reminder)}>Delete</Button>
                                    </Card.Header>
                                    <Card.Body>
                                        <h4>{reminder.title}</h4>
                                        <Card.Subtitle>
                                            <div>Time: {reminder.timestamp ?
                                                reminder.timestamp.slice(0, 16).replace('T', ' ') :
                                                'not set'}
                                            </div>
                                        </Card.Subtitle>
                                    </Card.Body>
                                    <Card.Footer>
                                    </Card.Footer>
                                </Card>
                            </Col>)
                    }) :
                    <h2>Loading...</h2>
                }
            </Row>
            <ToastContainer className={"p-3"} position={'bottom-end'}>
                <Toast bg='danger' onClose={() => setShowGetRemindersError(false)} show={showGetRemindersError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Retrieve Reminders</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowCreateReminderError(false)} show={showCreateReminderError}
                       delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Create Reminder</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowDeleteReminderError(false)} show={showDeleteReminderError}
                       delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Delete Reminder</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowGetReminderError(false)} show={showGetReminderError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Retrieve Reminder</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowUpdateReminderError(false)} show={showUpdateReminderError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Update Reminder</b></Toast.Body>
                </Toast>
            </ToastContainer>

        </>
    );
}

export default Reminders;
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