import {Badge, Button, Col, Row, Card, Modal, Form, Toast, ToastContainer} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import {LoadingMemo} from './LoadingMemo.js'

function Memos({
                   handleLogoutRequest,
                   handleCreateMemo,
                   handleDeleteMemo,
                   memos,
                   getMemosPending,
                   getMemosFailure,
                   createMemoPending,
                   createMemoFailure,
                   deleteMemoFailure
               }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content, setMemoText] = useState('');
    const [memoTags, setTags] = useState('');
    const [showError, setShowError] = useState(false);
    const [showCreateMemoError, setShowCreateMemoError] = useState(false);
    const [showDeleteMemoError, setShowDeleteMemoError] = useState(false);

    useEffect(() => {
        if (getMemosFailure) {
            setShowError(true)
        }
        if (createMemoFailure) {
            setShowCreateMemoError(true)
        }
        if (deleteMemoFailure) {
            setShowDeleteMemoError(true)
        }
    }, [getMemosFailure, createMemoFailure, deleteMemoFailure])


    function handleSubmit(event) {
        event.preventDefault()
        console.log({content, memoTags});
        const tags = memoTags.split(',')
        handleCreateMemo({content, tags});
        handleClose();
    }



    // function handleDelete() {
    //     console.log(event.target.value);
    //     handleDeleteMemo(event.target.value.id, event.target.value.timestamp);
    // }

    function handleTextChange(event) {
        setMemoText(event.target.value)
    }

    function handleTagsChange(event) {
        setTags(event.target.value)
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Memo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="createMemo">
                            <Form.Label>New Memo: </Form.Label>
                            <Form.Control type="text" placeholder="Memo" onChange={handleTextChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTags">
                            <Form.Label>Tags: </Form.Label>
                            <Form.Control type="text" placeholder="Tag1, Tag2" onChange={handleTagsChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
            <Row>
                <Col><h1>WELCOME!!!</h1></Col>
                <Col xs='auto'>
                    <Button onClick={handleShow}>New</Button>
                </Col>
                <Col xs='auto'>
                    <Button variant='outline-primary' onClick={handleLogoutRequest}>Logout</Button>
                </Col>
            </Row>
            <Row>
                {
                    memos || !getMemosPending ? memos.map(memo => {
                            return (
                                <Card style={{width: '18rem'}} key={memo.id}>
                                    <Card.Header>
                                        <Button onClick={() => handleDeleteMemo(memo)}>DELETE!!!</Button>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Subtitle>
                                            {memo.create_timestamp.slice(0, 16).replace('T', ' ')}
                                        </Card.Subtitle>
                                        {memo.content}
                                    </Card.Body>
                                    <Card.Footer>
                                        {memo.tags ? memo.tags.map(tag => {
                                            return (<Badge className={'m-2'}>{tag}</Badge>)
                                        }) : console.log('No tags')}
                                    </Card.Footer>
                                </Card>)
                        }) :
                        <h2>Loading...</h2>

                }
                {/*<Card style={{width: '18rem'}}>*/}

                {/*    <Card.Body>*/}
                {/*        <Placeholder as={Card.Title} animation="glow">*/}
                {/*            <Placeholder xs={6}/>*/}
                {/*        </Placeholder>*/}
                {/*        <Placeholder as={Card.Text} animation="glow">*/}
                {/*            <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}*/}
                {/*            <Placeholder xs={6}/> <Placeholder xs={8}/>*/}
                {/*        </Placeholder>*/}

                {/*    </Card.Body>*/}
                {/*    <Card.Footer className="text-muted">FOOTER</Card.Footer>*/}
                {/*</Card>*/}
            </Row>
            <ToastContainer className={"p-3"} position={'bottom-end'}>
                <Toast bg='danger' onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                    <Toast.Body bg='danger'><b>Unable to Retrieve Memos</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowCreateMemoError(false)} show={showCreateMemoError} delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Create Memo</b></Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowDeleteMemoError(false)} show={showDeleteMemoError} delay={3000}
                       autohide>
                    <Toast.Body bg='danger'><b>Unable to Delete Memo</b></Toast.Body>
                </Toast>
            </ToastContainer>
            {createMemoPending && <LoadingMemo/>}
        </>
    );
}

export default Memos;