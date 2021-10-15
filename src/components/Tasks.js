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

function Tasks({
                    task,
                    tasks,
                    handleLogoutRequest,
                    handleCreateTask,
                    handleUpdateTask,
                    handleDeleteTask,
                    handleGetTask,
                    handleGetTasks,
                    getTasksPending,
                    getTasksFailure,
                    createTaskPending,
                    createTaskFailure,
                    deleteTaskFailure
                }) {
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);
    const [taskID, setTaskID] = useState('')
    const [taskTitle, setTaskTitle] = useState('');
    const [taskEventID, setTaskEventID] = useState('');
    const [taskLocation, setTaskLocation] = useState('');
    const [taskStartTime, setTaskStartTime] = useState('');
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndTime, setTaskEndTime] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');
    const [taskSteps, setTaskSteps] = useState([]);
    const [taskLink, setTaskLink] = useState('');
    const [showError, setShowError] = useState(false);
    const [showCreateTaskError, setShowCreateTaskError] = useState(false);
    const [showDeleteTaskError, setShowDeleteTaskError] = useState(false);
    const [tasksRange, setTasksRange] = useState(defaultDate());
    const [taskUpdate, setTaskUpdate] = useState(false);

    function handleTaskSubmit(event) {
        event.preventDefault()
        let steps = taskSteps[0] ? taskSteps.split(',') : []
        const request = {
            title: taskTitle,
            timestamp: taskStartDate,
            step_list: steps
        }
        if (taskUpdate) {
            request.id = taskID
        }
        console.log(request)
        taskUpdate ? handleUpdateTask(request) : handleCreateTask(request);
        taskUpdate ? handleCloseDetail() : handleCloseCreate();
    }

    function handleTaskUpdate(update) {
        update.preventDefault()

    }

    function handleTaskCreate(input) {
        setTaskUpdate(false);
        setTaskID('');
        setTaskTitle('');
        setTaskEventID('');
        setTaskStartDate('');
        handleShowCreate();
    }

    async function handleTaskDetail(input) {
        setTaskUpdate(true);
        console.log(taskUpdate);
        await handleGetTask(input);
        handleShowDetail();
    }

    useEffect(() => {
        if (getTasksFailure) {
            setShowError(true)
        }
        if (createTaskFailure) {
            setShowCreateTaskError(true)
        }
        if (deleteTaskFailure) {
            setShowDeleteTaskError(true)
        }

    }, [getTasksFailure, createTaskFailure, deleteTaskFailure])

    useEffect(() => {
        setTaskID(task.id);
        setTaskEventID(task.event_id);
        setTaskTitle(task.title);
        setTaskStartDate(task.timestamp ? task.timestamp.toLocaleString() : task.timestamp);
    }, [task])

    function handleTitleChange(event) {
        setTaskTitle(event.target.value)
    }

    function handleStartDateChange(event) {
        setTaskStartDate(event.target.value)
    }

    function handleStepsChange(event) {
        setTaskSteps(event.target.value);
    }

    function handleStartChange(event) {
        setTasksRange({...tasksRange, range_start: new Date(event.target.value)});
    }
    function handleEndChange(event) {
        setTasksRange({...tasksRange, range_end: new Date(event.target.value)});
    }
    function handleFilter(event) {
        event.preventDefault();
        handleGetTasks({tasksRange})
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
            {/*CREATE TASK MODAL*/}
            <Modal show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleTaskSubmit}>
                        <Form.Group className="mb-2" controlId="createTitle">
                            <Form.Label>Task Title:</Form.Label>
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
            {/*DETAIL & EDIT TASK MODAL*/}
            <Modal show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleTaskSubmit}>
                        <Form.Group className="mb-2" controlId="createTitle">
                            <Form.Label>Task Title:</Form.Label>
                            <Form.Control type="text" placeholder="Title" defaultValue={taskTitle}
                                          onChange={handleTitleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="createStart">
                            <Form.Label>Start Time: {taskStartDate}</Form.Label>
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
                            Update Task
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {/*YOUR TASKS*/}
            <Row className='bg-danger'>
                <Col><h1>TASKS</h1></Col>
                <Col xs='auto'>
                    <Button onClick={() => handleTaskCreate()}>Create Task</Button>
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
            {/*//TASKS*/}
            <Row>
                {tasks ? tasks.map(task => {
                        return (
                            <Col xs={4} key={task.id}>
                                <Card className={"my-3"}>
                                    <Card.Header>
                                        <Button className={"m-2"} onClick={() => handleTaskDetail(task)}>Edit</Button>
                                        <Button className={"m-2"} onClick={() => handleDeleteTask(task)}>Delete</Button>
                                    </Card.Header>
                                    <Card.Body>
                                        <h4 >{task.title}</h4>
                                        <Card.Subtitle>
                                            <div>Time: {task.timestamp ?
                                            task.timestamp.slice(0, 16).replace('T', ' ') :
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
                <Toast bg='danger' onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Retrieve Tasks</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowCreateTaskError(false)} show={showCreateTaskError}
                       delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Create Task</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowDeleteTaskError(false)} show={showDeleteTaskError}
                       delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Delete Task</b></Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default Tasks;
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