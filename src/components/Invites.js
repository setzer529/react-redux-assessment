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

function Invites({
                     invite,
                     invites,
                     handleLogoutRequest,
                     handleCreateInvite,
                     handleUpdateInvite,
                     handleDeleteInvite,
                     handleGetInvite,
                     handleGetInvites,
                     getInvitesPending,
                     getInvitesFailure,
                     createInvitePending,
                     createInviteFailure,
                     deleteInviteFailure,
                     getInvitePending,
                     getInviteFailure,
                     updateInvitePending,
                     updateInviteFailure
                 }) {
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);
    const [inviteID, setInviteID] = useState('')
    const [inviteTitle, setInviteTitle] = useState('');
    const [inviteEventID, setInviteEventID] = useState('');
    const [inviteAccepted, setInviteAccepted] = useState(false);
    const [inviteStartTime, setInviteStartTime] = useState('');
    const [inviteStartDate, setInviteStartDate] = useState('');
    const [inviteEndTime, setInviteEndTime] = useState('');
    const [inviteEndDate, setInviteEndDate] = useState('');
    const [inviteSteps, setInviteSteps] = useState([]);
    const [inviteUserID, setInviteUserID] = useState('');
    const [showGetInvitesError, setShowGetInvitesError] = useState(false);
    const [showCreateInviteError, setShowCreateInviteError] = useState(false);
    const [showDeleteInviteError, setShowDeleteInviteError] = useState(false);
    const [showGetInviteError, setShowGetInviteError] = useState(false);
    const [showUpdateInviteError, setShowUpdateInviteError] = useState(false);
    const [invitesRange, setInvitesRange] = useState(defaultDate());
    const [inviteUpdate, setInviteUpdate] = useState(false);

    function handleInviteSubmit(event) {
        const request = {
            accepted: inviteAccepted,
        }
        if (inviteUpdate) {request.id = inviteID}
        console.log(request)
        inviteUpdate ? handleUpdateInvite(request) : handleCreateInvite(request);
    }

    function handleInviteUpdate(update) {
        update.preventDefault()
    }

    function handleInviteCreate(input) {
        setInviteUpdate(false);
        setInviteID('');
        setInviteTitle('');
        setInviteEventID('');
        setInviteStartDate('');
        handleShowCreate();
    }

    async function handleInviteDetail(input) {
        setInviteUpdate(true);
        console.log(inviteUpdate);
        await handleGetInvite(input);
        handleShowDetail();
    }

    function handleInviteAccept(invite) {
        setInviteUpdate(true);
        setInviteAccepted(true);
        // setInviteID(invite.id);
        // setInviteEventID(invite.event_id);
        handleInviteSubmit()
    }

    function handleInviteReject(invite) {
        setInviteUpdate(true);
        setInviteAccepted(false);
        // setInviteID(invite.id);
        // setInviteEventID(invite.event_id);
        handleInviteSubmit()
    }


    useEffect(() => {
        if (getInvitesFailure) {
            setShowGetInvitesError(true)
        }
        if (createInviteFailure) {
            setShowCreateInviteError(true)
        }
        if (deleteInviteFailure) {
            setShowDeleteInviteError(true)
        }
        if (getInviteFailure) {
            setShowGetInviteError(true)
        }
        if (updateInviteFailure) {
            setShowUpdateInviteError(true)
        }

    }, [getInvitesFailure, createInviteFailure, deleteInviteFailure, getInviteFailure, updateInviteFailure])

    useEffect(() => {
        console.log(invite)
        setInviteID(invite.id);
        setInviteEventID(invite.event_id);
        setInviteTitle(invite.title);
        setInviteAccepted(invite.accepted)
    }, [invite])

    function handleTitleChange(event) {
        setInviteTitle(event.target.value)
    }

    function handleStartDateChange(event) {
        setInviteStartDate(event.target.value)
    }

    function handleStepsChange(event) {
        setInviteSteps(event.target.value);
    }

    function handleStartChange(event) {
        setInvitesRange({...invitesRange, range_start: new Date(event.target.value)});
    }

    function handleEndChange(event) {
        setInvitesRange({...invitesRange, range_end: new Date(event.target.value)});
    }

    function handleFilter(event) {
        event.preventDefault();
        handleGetInvites({invitesRange})
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
            {/*CREATE INVITE MODAL*/}
            <Modal show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Invite</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleInviteSubmit}>
                        <Form.Group className="mb-2" controlId="createTitle">
                            <Form.Label>Invite Title:</Form.Label>
                            <Form.Control type="text" placeholder="Title" onChange={handleTitleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createStart">
                            <Form.Label>Date/Time: </Form.Label>
                            <Form.Control type="datetime-local" onChange={handleStartDateChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createAttendees">
                            <Form.Label>Steps: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Step 1, Step 2"
                                onChange={handleStepsChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {/*DETAIL & EDIT INVITE MODAL*/}
            <Modal show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Invite</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {invite.accepted ? <Button className={"m-2"} onClick={() => handleInviteAccept()}>Accept</Button>:
                        <Button className={"m-2 btn-danger "} onClick={() => handleInviteReject()}>Reject</Button>}
                </Modal.Body>
            </Modal>
            {/*YOUR INVITES*/}
            <Row className='bg-danger'>
                <Col><h1>INVITES</h1></Col>
                <Col xs='auto'>
                    <Button onClick={() => handleInviteCreate()}>Create Invite</Button>
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
            {/*//INVITES*/}
            <Row>
                {invites ? invites.map(invite => {
                        return (
                            <Col xs={4} key={invite.id}>
                                <Card className={"my-3"}>
                                    <Card.Header>
                                        <Button className={"m-2"} onClick={() => handleInviteDetail(invite)}>Edit</Button>
                                        <Button className={"m-2"} onClick={() => handleDeleteInvite(invite)}>Delete</Button>
                                    </Card.Header>
                                    <Card.Body>
                                        <h4>{invite.title}</h4>
                                        <Card.Subtitle>
                                            <div>Time: {invite.timestamp ?
                                                invite.timestamp.slice(0, 16).replace('T', ' ') :
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
                <Toast bg='danger' onClose={() => setShowGetInvitesError(false)} show={showGetInvitesError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Retrieve Invites</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowCreateInviteError(false)} show={showCreateInviteError}
                       delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Create Invite</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowDeleteInviteError(false)} show={showDeleteInviteError}
                       delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Delete Invite</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowGetInviteError(false)} show={showGetInviteError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Retrieve Invite</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowUpdateInviteError(false)} show={showUpdateInviteError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Update Invite</b></Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default Invites;

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